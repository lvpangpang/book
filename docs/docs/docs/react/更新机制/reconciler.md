# reconciler

1. 当发生渲染或者更新操作时，react 去创建一系列的任务，任务带有优先级，然后构建 workInProgress fiber 树链表。
2. 遍历任务链表去执行任务。每一帧先执行浏览器的渲染等任务，如果当前帧还有空闲时间，则执行任务，直到当前帧的时间用完。如果当前帧已经没有空闲时间，就等到下一帧的空闲时间再去执行。如果当前帧没有空闲时间但是当前任务链表有任务到期了或者有立即执行任务，那么必须执行的时候就以丢失几帧的代价，执行这些任务。执行完的任务都会被从链表中删除。

## 1 根据任务类型执行不同更新

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
export function scheduleUpdateOnFiber(
  fiber: Fiber,
  lane: Lane,
  eventTime: number,
) {
  // 检查是否有循环更新
  // 避免例如在类组件 render 函数中调用了 setState 这种死循环的情况
  checkForNestedUpdates();

  // ...
  // 自底向上更新 child.fiberLanes
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);

  // ...
  // 标记 root 有更新，将 update 的 lane 插入到root.pendingLanes 中
  markRootUpdated(root, lane, eventTime);

  if (lane === SyncLane) { // 同步任务，采用同步渲染
    if (
      (executionContext & LegacyUnbatchedContext) !== NoContext &&
      (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
      // 如果本次是同步更新，并且当前还未开始渲染
      // 表示当前的 js 主线程空闲，并且没有 react 任务在执行

      // ...
      // 调用 performSyncWorkOnRoot 执行同步更新任务
      performSyncWorkOnRoot(root);
    } else {
      // 如果本次时同步更新，但是有 react 任务正在执行

      // 调用 ensureRootIsScheduled 去复用当前正在执行的任务，让其将本次的更新一并执行
      ensureRootIsScheduled(root, eventTime);
      schedulePendingInteractions(root, lane);

      // ...
  } else {
    // 如果本次更新是异步任务

    // ...
    // 调用 ensureRootIsScheduled 执行可中断更新
    ensureRootIsScheduled(root, eventTime);
    schedulePendingInteractions(root, lane);
  }

  mostRecentlyUpdatedRoot = root;
}
```

### 1.1 执行同步更新

当任务的类型为同步任务，并且当前的 js 主线程空闲（没有正在执行的 react 任务时），会通过 performSyncWorkOnRoot(root) 方法开始执行同步任务。
performSyncWorkOnRoot 里面主要做了两件事：

- renderRootSync 从根节点开始进行同步渲染任务
- commitRoot 执行 commit 流程

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function performSyncWorkOnRoot(root) {
  // ...
  exitStatus = renderRootSync(root, lanes)
  // ...
  commitRoot(root)
  // ...
}
```

当任务类型为同步类型，但是 js 主线程非空闲时。会执行 ensureRootIsScheduled 方法：

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js

function ensureRootIsScheduled(root: FiberRoot, currentTime: number) {
  // ...
  // 如果有正在执行的任务，
  if (existingCallbackNode !== null) {
    const existingCallbackPriority = root.callbackPriority
    if (existingCallbackPriority === newCallbackPriority) {
      // 任务优先级没改变，说明可以复用之前的任务一起执行
      return
    }
    // 任务优先级改变了，说明不能复用。
    // 取消正在执行的任务，重新去调度
    cancelCallback(existingCallbackNode)
  }

  // 进行一个新的调度
  let newCallbackNode
  if (newCallbackPriority === SyncLanePriority) {
    // 如果是同步任务优先级，执行 performSyncWorkOnRoot
    newCallbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
  } else if (newCallbackPriority === SyncBatchedLanePriority) {
    // 如果是批量同步任务优先级，执行 performSyncWorkOnRoot
    newCallbackNode = scheduleCallback(
      ImmediateSchedulerPriority,
      performSyncWorkOnRoot.bind(null, root)
    )
  } else {
    // ...
    // 如果不是批量同步任务优先级，执行 performConcurrentWorkOnRoot
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root)
    )
  }
  // ...
}
```

### 1.2 执行可中断更新

当任务的类型不是同步类型时，react 也会执行 ensureRootIsScheduled 方法，因为是异步任务，最终会执行 performConcurrentWorkOnRoot 方法，去进行可中断的更新，下面会详细讲到。

## 2 workLoop

### 2.1 同步

以同步更新为例，performSyncWorkOnRoot 会经过以下流程，performSyncWorkOnRoot ——> renderRootSync ——> workLoopSync。
workLoopSync 中，只要 workInProgress（workInProgress fiber 树中新创建的 fiber 节点） 不为 null，就会一直循环，执行 performUnitOfWork 函数。

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}
```

### 2.2 可中断

可中断模式下，performConcurrentWorkOnRoot 会执行以下过程：performConcurrentWorkOnRoot ——> renderRootConcurrent ——> workLoopConcurrent。
相比于 workLoopSync, workLoopConcurrent 在每一次对 workInProgress 执行 performUnitOfWork 前，会先判断以下 shouldYield() 的值。若为 false 则继续执行，若为 true 则中断执行。

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}
```

## 3 performUnitOfWork

最终无论是同步执行任务，还是可中断地执行任务，都会进入 performUnitOfWork 函数中。
performUnitOfWork 中会以 fiber 作为单元，进行协调过程。每次 beginWork 执行后都会更新 workIngProgress，从而响应了上面 workLoop 的循环。
直至 fiber 树遍历完成后，workInProgress 此时置为 null，执行 completeUnitOfWork 函数。

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function performUnitOfWork(unitOfWork: Fiber): void {
  // ...
  const current = unitOfWork.alternate
  // ...

  let next
  if (enableProfilerTimer && (unitOfWork.mode & ProfileMode) !== NoMode) {
    // ...
    next = beginWork(current, unitOfWork, subtreeRenderLanes)
  } else {
    next = beginWork(current, unitOfWork, subtreeRenderLanes)
  }

  // ...
  if (next === null) {
    completeUnitOfWork(unitOfWork)
  } else {
    workInProgress = next
  }

  ReactCurrentOwner.current = null
}
```

### 3.1 beginWork

originalBeginWork 中，会根据 workInProgress 的 tag 属性，执行不同类型的 react 元素的更新函数。但是他们都大同小异，不论是 tag 是何种类型，更新函数最终都会去调用 reconcileChildren 函数。

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js

let beginWork
if (__DEV__ && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
  beginWork = (current, unitOfWork, lanes) => {
    // ...
    try {
      return originalBeginWork(current, unitOfWork, lanes)
    } catch (originalError) {
      // ...
    }
  }
} else {
  beginWork = originalBeginWork
}
// packages/react-reconciler/src/ReactFiberBeginWork.old.js

function beginWork(current: Fiber | null, workInProgress: Fiber, renderLanes: Lanes): Fiber | null {
  const updateLanes = workInProgress.lanes

  workInProgress.lanes = NoLanes

  // 针对 workInProgress 的tag，执行相应的更新
  switch (workInProgress.tag) {
    // ...
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes)
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes)
    // ...
  }
  // ...
}
```

reconcileChildren 做的事情就是 react 的另一核心之一 —— diff 过程。

```js
// packages/react-reconciler/src/ReactFiberBeginWork.old.js

function updateHostRoot(current, workInProgress, renderLanes) {
  // ...
  const root: FiberRoot = workInProgress.stateNode
  if (root.hydrate && enterHydrationState(workInProgress)) {
    // 若根 fiber 不存在，说明是首次渲染，调用 mountChildFibers
    // ...
    const child = mountChildFibers(workInProgress, null, nextChildren, renderLanes)
    workInProgress.child = child
  } else {
    // 若根 fiber 存在，调用 reconcileChildren
    reconcileChildren(current, workInProgress, nextChildren, renderLanes)
    resetHydrationState()
  }
  return workInProgress.child
}
```

### 3.2 completeUnitOfWork

当 workInProgress 为 null 时，也就是当前任务的 fiber 树遍历完之后，就进入到了 completeUnitOfWork 函数。
经过了 beginWork 操作，workInProgress 节点已经被打上了 flags 副作用标签。completeUnitOfWork 方法中主要是逐层收集 effects
链，最终收集到 root 上，供接下来的 commit 阶段使用。
completeUnitOfWork 结束后，render 阶段便结束了，后面就到了 commit 阶段。

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function completeUnitOfWork(unitOfWork: Fiber): void {
  let completedWork = unitOfWork
  do {
    // ...
    // 对节点进行completeWork，生成DOM，更新props，绑定事件
    next = completeWork(current, completedWork, subtreeRenderLanes)

    if (returnFiber !== null && (returnFiber.flags & Incomplete) === NoFlags) {
      // 将当前节点的 effectList 并入到父节点的 effectList
      if (returnFiber.firstEffect === null) {
        returnFiber.firstEffect = completedWork.firstEffect
      }
      if (completedWork.lastEffect !== null) {
        if (returnFiber.lastEffect !== null) {
          returnFiber.lastEffect.nextEffect = completedWork.firstEffect
        }
        returnFiber.lastEffect = completedWork.lastEffect
      }

      // 将自身添加到 effectList 链，添加时跳过 NoWork 和 PerformedWork的 flags，因为真正的 commit 时用不到
      const flags = completedWork.flags

      if (flags > PerformedWork) {
        if (returnFiber.lastEffect !== null) {
          returnFiber.lastEffect.nextEffect = completedWork
        } else {
          returnFiber.firstEffect = completedWork
        }
        returnFiber.lastEffect = completedWork
      }
    }
  } while (completedWork !== null)

  // ...
}
```
