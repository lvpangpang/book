# setState(updater, callback)

## 1. 源代码

```jsx
Component.prototype.setState = function (partialState, callback) {
  if (
    typeof partialState !== 'object' &&
    typeof partialState !== 'function' &&
    partialState != null
  ) {
    throw new Error(
      'setState(...): takes an object of state variables to update or a ' +
        'function which returns an object of state variables.'
    )
  }

  this.updater.enqueueSetState(this, partialState, callback, 'setState')
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

在 React 中， 如果是由 React 引发的事件处理（比如通过 onClick 引发的事件处理），调用 setState 不会同步更新 this.state，除此之外的 setState 调用会同步执行 this.state 。所谓“除此之外”，指的是绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用。

原因： React 在调用事件处理函数之前就会调用 batchedUpdates 函数，这个函数会把变量 isBatchingUpdates 设置为 true
，根据这个参数的值 React 来决定是直接更新 state 还是放到队列中回头再说

注意： setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。

## 4. setState()发生了啥

1. 在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。
2. 然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。
3. 然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
4. 在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
5. 当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。
6. 当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
7. 在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素
