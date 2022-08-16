# React 工作流程

## 1. 初始化

1. 第一步

```jsx
ReactDOM.render(<APP />, document.getElementById('root')
```

2. 第二步

```jsx
function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
}
```

3. 第三步

```jsx
function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  var root = container._reactRootContainer
  var fiberRoot
  // 初始化阶段
  if (!root) {
    // 通过调用legacyCreateRootFromDOMContainer方法将其返回值赋值给container._reactRootContainer
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
    fiberRoot = root._internalRoot
    /*     if (typeof callback === 'function') {
      var originalCallback = callback
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot)
        originalCallback.call(instance)
      }
    } */
    unbatchedUpdates(function () {
      updateContainer(children, fiberRoot, parentComponent, callback)
    })
  } else {
    fiberRoot = root._internalRoot
    /* if (typeof callback === 'function') {
      var _originalCallback = callback
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot)
        _originalCallback.call(instance)
      }
    } */
    updateContainer(children, fiberRoot, parentComponent, callback)
  }
  return getPublicRootInstance(fiberRoot)
}
```

```jsx
function getPublicRootInstance(container) {
  var containerFiber = container.current
  if (!containerFiber.child) {
    return null
  }
  switch (containerFiber.child.tag) {
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode)
    default:
      return containerFiber.child.stateNode
  }
}
```

4. 第四步

```jsx
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  // 判断是否需要融合
  var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container)
  // 针对客户端渲染的情况，需要将container容器中的所有元素移除（所以你在<div id="root"></div>你们写啥都是会被清空的）
  if (!shouldHydrate) {
    var warned = false
    var rootSibling
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling)
    }
  }
  // 返回一个LegacyRoot实例
  return createLegacyRoot(
    container,
    shouldHydrate
      ? {
          hydrate: true,
        }
      : undefined
  )
}
```

5. 第五步

```jsx
function createLegacyRoot(container, options) {
  return new ReactDOMLegacyRoot(container, options)
}
```

6. 第六步

```jsx
function ReactDOMLegacyRoot(container, options) {
  this._internalRoot = createRootImpl(container, LegacyRoot, options)
}
```

7. 第七步

```jsx
function createRootImpl(container, tag, options) {
  // Tag is either LegacyRoot or Concurrent Root
  var hydrate = options != null && options.hydrate === true

  var hydrationCallbacks = (options != null && options.hydrationOptions) || null

  var mutableSources =
    (options != null &&
      options.hydrationOptions != null &&
      options.hydrationOptions.mutableSources) ||
    null

  var isStrictMode = options != null && options.unstable_strictMode === true

  // 创建一个fiberRoot
  var root = createContainer(container, tag, hydrate, hydrationCallbacks, isStrictMode)

  // 给container附加一个内部属性用于指向fiberRoot的current属性对应的rootFiber节点
  markContainerAsRoot(root.current, container)

  var rootContainerElement = container.nodeType === COMMENT_NODE ? container.parentNode : container

  listenToAllSupportedEvents(rootContainerElement)

  if (mutableSources) {
    for (var i = 0; i < mutableSources.length; i++) {
      var mutableSource = mutableSources[i]
      registerMutableSourceForHydration(root, mutableSource)
    }
  }
  return root
}
```

8. 第八步

```jsx
function createFiberRoot(
  containerInfo,
  tag,
  hydrate,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride
) {
  // 通过FiberRootNode构造函数创建一个fiberRoot实例
  var root = new FiberRootNode(containerInfo, tag, hydrate)

  // 通过createHostRootFiber方法创建fiber tree的根节点，即rootFiber
  // 需要留意的是，fiber节点也会像DOM树结构一样形成一个fiber tree单链表树结构
  // 每个DOM节点或者组件都会生成一个与之对应的fiber节点(生成的过程会在后续的文章中进行解读)
  // 在后续的调和(reconciliation)阶段起着至关重要的作用
  var uninitializedFiber = createHostRootFiber(tag, isStrictMode)

  // 创建完rootFiber之后，会将fiberRoot实例的current属性指向刚创建的rootFiber
  root.current = uninitializedFiber
  // 同时rootFiber的stateNode属性会指向fiberRoot实例，形成相互引用
  uninitializedFiber.stateNode = root

  {
    var initialCache = new Map()
    root.pooledCache = initialCache
    var initialState = {
      element: null,
      cache: initialCache,
    }
    uninitializedFiber.memoizedState = initialState
  }
  // 初始化更新队列
  initializeUpdateQueue(uninitializedFiber)
  // 将创建的fiberRoot实例返回
  return root
}
```

9. 第九步

```jsx
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag
  this.containerInfo = containerInfo
  this.pendingChildren = null
  this.current = null //指向当前激活的与之对应的rootFiber节点
  this.pingCache = null
  this.finishedWork = null
  this.timeoutHandle = noTimeout
  this.context = null
  this.pendingContext = null
  this.hydrate = hydrate
  this.callbackNode = null //每个fiberRoot实例上都只会维护一个任务，该任务保存在callbackNode属性中
  this.callbackPriority = NoLane // 当前任务的优先级
  //...
}
function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null // Fiber

  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0
  this.ref = null
  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.dependencies = null
  this.mode = mode // Effects

  this.flags = NoFlags
  this.subtreeFlags = NoFlags
  this.deletions = null
  this.lanes = NoLanes
  this.childLanes = NoLanes
  this.alternate = null
}
```

## 2. 更新

1.将 setState 传入的 partialState 参数存储在当前组件实例的 state 暂存队列中。 2.判断当前 React 是否处于批量更新状态，如果是，将当前组件加入待更新的组件队列中。 3.如果未处于批量更新状态，将批量更新状态标识设置为 true，用事务再次调用前一步方法，保证当前组件加入到了待更新组件队列中。 4.调用事务的 waper 方法，遍历待更新组件队列依次执行更新。 5.执行生命周期 componentWillReceiveProps。 6.将组件的 state 暂存队列中的 state 进行合并，获得最终要更新的 state 对象，并将队列置为空。 7.执行生命周期 componentShouldUpdate，根据返回值判断是否要继续更新。 8.执行生命周期 componentWillUpdate。 9.执行真正的更新，render。 10.执行生命周期 componentDidUpdate。

1. 第一步

```jsx
ReactComponent.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState)
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState')
  }
}
```

2. 第二步

```jsx
function enqueueSetState(publicInstance, partialState) {
  // 根据 this 拿到对应的组件实例
  var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState')
  // 这个 queue 对应的就是一个组件实例的 state 数组
  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = [])
  queue.push(partialState)
  //  enqueueUpdate 用来处理当前的组件实例
  enqueueUpdate(internalInstance)
}
```

3. 第三步

```jsx
function enqueueUpdate(component) {
  ensureInjected()
  // 注意这一句是问题的关键，isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段
  if (!batchingStrategy.isBatchingUpdates) {
    // 若当前没有处于批量创建/更新组件的阶段，则立即更新组件
    batchingStrategy.batchedUpdates(enqueueUpdate, component)
    return
  }
  // 否则，先把组件塞入 dirtyComponents 队列里，让它“再等等”
  dirtyComponents.push(component)
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1
  }
}
```
