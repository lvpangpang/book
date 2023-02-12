# reconciler
## 1 performUnitOfWork

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

## 2 beginWork

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

### 3 completeUnitOfWork

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
