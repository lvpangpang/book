# 渲染流程

## 1. 整体流程

![流程图片](./img1.png)

```js
const state = reconcile(update)
const UI = commit(state)
```

- Scheduler（调度器）： 排序优先级，让优先级高的任务先进行 reconcile
- Reconciler（协调器）： 找出哪些节点发生了改变，并打上不同的 Flags（旧版本 react 叫 Tag）
- Renderer（渲染器）： 将 Reconciler 中打好标签的节点渲染到视图上

## 2. 初始化

- 在 render 阶段会根据 jsx 对象构建新的 workInProgressFiber 树，然后将相应的 fiber 节点标记为 Placement，表示这个 fiber 节点需要被插入到 dom 树中，然后把这些带有副作用的 fiber 节点加入一条叫做 Effect List 的链表中。
- 在 commit 阶段会遍历 render 阶段形成的 Effect List，执行链表上相应 fiber 节点的副作用，比如 Placement 插入，或者执行 Passive（useEffect 的副作用）。将这些副作用应用到真实节点上

## 3. 更新

- 在 render 阶段会根据最新状态的 jsx 对象对比 current Fiber，再构建新的 workInProgressFiber 树，这个对比的过程就是 diff 算法，diff 算法又分成单节点的对比和多节点的对比，对比的过程中同样会经历收集副作用的过程，也就是将对比出来的差异标记出来，加入 Effect List 中，这些对比出来的副作用例如：Placement（插入）、Update(更新)、Deletion（删除）等。
- 在 commit 阶段同样会遍历 Effect List，将这些 fiber 节点上的副作用应用到真实节点上

## 6. ReactDom.render()

1. render()

```js
export function render(element: React$Element<any>, container: Container, callback: ?Function) {
  return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
}
```

2. legacyRenderSubtreeIntoContainer()

```js
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback: ?Function
) {
  if (__DEV__) {
    topLevelUpdateWarnings(container)
    warnOnInvalidCallback(callback === undefined ? null : callback, 'render')
  }

  let root: RootType = (container._reactRootContainer: any)
  let fiberRoot
  // 初始化
  if (!root) {
    // Initial mount
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
    fiberRoot = root._internalRoot
    if (typeof callback === 'function') {
      const originalCallback = callback
      callback = function () {
        const instance = getPublicRootInstance(fiberRoot)
        originalCallback.call(instance)
      }
    }
    // Initial mount should not be batched.
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback)
    })
  } else {
    // 更新
    fiberRoot = root._internalRoot
    if (typeof callback === 'function') {
      const originalCallback = callback
      callback = function () {
        const instance = getPublicRootInstance(fiberRoot)
        originalCallback.call(instance)
      }
    }
    // Update
    updateContainer(children, fiberRoot, parentComponent, callback)
  }
  return getPublicRootInstance(fiberRoot)
}
```

3. updateContainer()

```js
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function
): Lane {
  if (__DEV__) {
    onScheduleRoot(container, element)
  }
  const current = container.current
  const eventTime = requestEventTime()
  if (__DEV__) {
    // $FlowExpectedError - jest isn't a global, and isn't recognized outside of tests
    if ('undefined' !== typeof jest) {
      warnIfUnmockedScheduler(current)
      warnIfNotScopedWithMatchingAct(current)
    }
  }
  const lane = requestUpdateLane(current)

  if (enableSchedulingProfiler) {
    markRenderScheduled(lane)
  }

  const context = getContextForSubtree(parentComponent)
  if (container.context === null) {
    container.context = context
  } else {
    container.pendingContext = context
  }

  const update = createUpdate(eventTime, lane)
  update.payload = { element }

  callback = callback === undefined ? null : callback
  if (callback !== null) {
    update.callback = callback
  }

  enqueueUpdate(current, update) // 处理更新队列
  scheduleUpdateOnFiber(current, lane, eventTime) // 调度 render

  return lane
}
```

## 5. setState()

触发 setState 节点开始，先往上找到 root 最顶层根元素，然后往下根据已存在属性拷贝一份新的 fiber，直到触发 setState 节点，再往下遍历调用子元素 render，中间可以根据 shouldComponentUpdate 等方法跳过
这个阶段分为两块，往下的过程是一些调用 render 或者克隆一个 fiber 节点的操作，往上的过程是生成 effect 和 updateQueue 更新内容的操作

```js
function Component(props, context, updater) {
  this.props = props
  this.context = context
  this.refs = emptyObject
  this.updater = updater || ReactNoopUpdateQueue
}
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState')
}
```

```js
const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    const fiber = getInstance(inst)
    const eventTime = requestEventTime()
    const lane = requestUpdateLane(fiber)

    const update = createUpdate(eventTime, lane)
    update.payload = payload
    if (callback !== undefined && callback !== null) {
      update.callback = callback
    }

    enqueueUpdate(fiber, update) // 处理更新队列
    scheduleUpdateOnFiber(fiber, lane, eventTime) // 调度 render

  },
}
```
