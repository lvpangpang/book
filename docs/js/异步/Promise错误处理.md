# Promise 错误处理

1. promise 链在错误（error）处理中十分强大。当一个 promise 被 reject 时，控制权将移交至最近的 rejection 处理程序。这在实际开发中非常方便。
2. 捕获所有 error 的最简单的方法是，将 .catch 附加到链的末尾

## 隐式 try…catch

promise 的执行者（executor）和 promise 的处理程序周围有一个“隐式的 try..catch”。如果发生异常，它就会被捕获，并被视为 rejection 进行处理。

```js
new Promise((resolve, reject) => {
  throw new Error('Whoops!')
}).catch(alert) // Error: Whoops!
```

```js
new Promise((resolve, reject) => {
  reject(new Error('Whoops!'))
}).catch(alert) // Error: Whoops!
```

注意下面的 2 种异常处理的不同

下面在异步里面的错误是可以被捕获到的
```js
new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject('Whoops!')
  }, 1000)
}).catch(alert)
```

下面在异步里面的错误是不会被捕获到的
```js
new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error('Whoops!')
  }, 1000)
}).catch(alert)
```
