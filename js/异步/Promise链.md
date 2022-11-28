# Promise 链

1. 当处理程序返回一个值时，它将成为该 promise 的 result，所以将使用它调用下一个 .then。
   处理程序返回的不完全是一个 promise，而是返回的被称为 “thenable” 对象 —— 一个具有方法 .then 的任意对象。它会被当做一个 promise 来对待。

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})
promise
  .then(function (result) {
    return result * 2
  })
  .then((data) => {
    console.log(data) // 1s后直接输出2
  })
```

2. 如果 .then（或 catch/finally 都可以）处理程序返回一个 promise，那么链的其余部分将会等待，直到它状态变为 settled。当它被 settled 后，其 result（或 error）将被进一步传递下去。

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})

promise
  .then(function (result) {
    // 这里的return一定要写
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000)
    })
  })
  .then((data) => {
    console.log(data) // 等待2s后才输出2
  })
```
