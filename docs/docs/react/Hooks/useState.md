# useState

## 1 使用

```js
import React, { useState } from 'react'

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

## 2 hook 数据结构

```js
const hook = {
  memoizedState: null, //对于不同hook，有不同的值
  baseState: null, //初始state
  baseQueue: null, //初始queue队列
  queue: null, //需要更新的update
  next: null, //下一个hook
}
```

## 3 源码

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
  const dispatch = (queue.dispatch = (dispatchAction.bind(null, currentlyRenderingFiber, queue)))
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

    scheduleUpdateOnFiber(fiber, lane, eventTime);
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
  const setState = (newState) => {
    state[stateIndex] = newState
    stateIndex = 0
    render()
  }
  const value = state[stateIndex]
  stateIndex++
  return [value, setState]
}
```
