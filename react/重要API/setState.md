# setState(updater, callback)

## 1. 源代码

```jsx
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState')
}
const classComponentUpdater = {
  enqueueSetState(inst, payload, callback) {
    const fiber = ReactInstanceMap.get(inst) // 获取当前组件的fiber对象
    const currentTime = requestCurrentTime() // 获取当前时间
    const expirationTime = computeExpirationForFiber(currentTime, fiber) // 获取超时时间
    const update = createUpdate(expirationTime)
    update.payload = payload
    if (callback !== undefined && callback !== null) {
      update.callback = callback
    }
    enqueueUpdate(fiber, update) // 排队更新
    scheduleWork(fiber, expirationTime) // 调度任务
  }
}
```

setState() 会对一个组件的 state 对象安排一次更新。当 state 改变了，该组件就会重新渲染。

## 2. 获取更新后的最新值

```jsx
this.setState(
  {
    num: 5,
  },
  () => {
    console.log(this.state) // 这里可以获取到最新的num值
  }
)
```

```jsx
componentDidUpdate() {
  console.log(this.state.num) // 这里可以获取到最新的num值
}
```

## 3. setState()是同步的还是异步的？

只要进入 React 的调度流程中就是异步，否则就是同步，比如定时器，原生绑定事件
