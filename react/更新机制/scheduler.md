# scheduler

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

## 2 执行同步更新

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

## 3 执行可中断更新

当任务的类型不是同步类型时，react 也会执行 ensureRootIsScheduled 方法，因为是异步任务，最终会执行 performConcurrentWorkOnRoot 方法，去进行可中断的更新，下面会详细讲到。

## 4 workLoop

### 4.1 同步

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

### 4.2 可中断

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
