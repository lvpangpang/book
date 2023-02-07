# useState

## 1 使用

### 1.1 useState 使用方式

1. 支持传入值
   ```js
   const [count, setCount] = useState([1, 2])
   setCount([1, 2, 3])
   ```
2. 支持传入函数，参数是上一次的 state 值，所以多次调用都会有效果而不是只生效一次
   ```js
   const [count, setCount] = useState([1, 2])
   setCount((count) => {
     const temp = [...count]
     temp.push(3)
     return temp
   })
   ```

### 1.2 this.setState()使用方式

1. 支持传入值

```js
this.setState({
  count: [1, 2],
})
```

2. 支持传入函数，这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数

```js
this.setState(
  (state, props) => {
    return {
      count: state.count + 1,
    }
  },
  () => {
    console.log(this.state.count) // 获取最新的值
  }
)
```

## 2 useState 和 this.setState()区别

1. **React 使用 Object.is(value1, value2) 比较算法来比较 state**
   对于复杂类型改变，比如数组，不管 this.setState()还是 useState()都需要传入一个新引用地址的对象或者数组才能让页面重新渲染

```js
const arr1 = [1, 2]
const arr2 = arr1
arr2.push(3)
Object.is(arr1, arr2) // true, 判断相等，所以不会更新
```

2. 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。
3. setState 方法传入相同值也会触发更新，useState 不会触发更新

```js
setState()
return Object.assgin({}, parState, newState)

useState //判断前后state是否一致，一致的话直接return不渲染
```

## 3 hook 数据结构

```js
const hook = {
  memoizedState: null, //对于不同hook，有不同的值
  baseState: null, //初始state
  baseQueue: null, //初始queue队列
  queue: null, //需要更新的update
  next: null, //下一个hook
}
```

## 4 源码

1. 声明阶段

```js
function useState(initialState) {
  var dispatcher = resolveDispatcher()
  return dispatcher.useState(initialState)
}
```

2. mount 阶段

```js
function mountState(initialState) {
  const hook = mountWorkInProgressHook() //创建当前hook
  // 这里就是可以传递函数的原因
  if (typeof initialState === 'function') {
    initialState = initialState()
  }
  hook.memoizedState = hook.baseState = initialState //hook.memoizedState赋值
  const queue = (hook.queue = {
    //赋值hook.queue
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer, //和mountReducer的区别
    lastRenderedState: (initialState: any),
  })
  const dispatch = (queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue))
  return [hook.memoizedState, dispatch] //返回memoizedState和dispatch
}
```

3. update 阶段
   宿主函数被重新执行的时候

```js
function updateReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: (I) => S
): [S, Dispatch<A>] {
  const hook = updateWorkInProgressHook() //获取hook
  const queue = hook.queue
  queue.lastRenderedReducer = reducer

  //...更新state和第12章的state计算逻辑基本一致

  const dispatch: Dispatch<A> = (queue.dispatch: any)
  return [hook.memoizedState, dispatch]
}
```

4. 执行阶段

```js
function dispatchAction(fiber, queue, action) {

  var update = {//创建update
    eventTime: eventTime,
    lane: lane,
    suspenseConfig: suspenseConfig,
    action: action,
    eagerReducer: null,
    eagerState: null,
    next: null
  };

  //queue.pending中加入update

  var alternate = fiber.alternate;

  if (fiber === currentlyRenderingFiber$1 || alternate !== null && alternate === currentlyRenderingFiber$1) {
    //如果是render阶段执行的更新didScheduleRenderPhaseUpdate=true
}
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  } else {
    if (fiber.lanes === NoLanes && (alternate === null || alternate.lanes === NoLanes)) {
      //如果fiber不存在优先级并且当前alternate不存在或者没有优先级，那就不需要更新了
      //优化的步骤
    }

    scheduleUpdateOnFiber(fiber, lane, eventTime); // this.setSatte()， ReactDOM.render()源码中都有
  }
}
```

## 4 简单源码实现

```js
import React from 'react'
import ReactDOM from 'react-dom'

const state = [] // 存放变量状态
let stateIndex = 0

// 强制刷新视图
function render() {
  ReactDOM.render(<App />, document.querySelector('#root'))
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  const value = state[stateIndex]
  stateIndex++
  const setState = (newState) => {
    state[stateIndex] = newState
    stateIndex = 0
    render()
  }
  return [value, setState]
}
```
