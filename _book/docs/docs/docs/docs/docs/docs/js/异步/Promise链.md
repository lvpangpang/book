# Promise 链

1. 当处理程序返回一个值时，它将成为该 promise 的 result，所以将使用它调用下一个 .then。

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
