# Promise

Promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值
和订阅发布模式比较像  
then，catch 订阅事件  
resolve，reject 发布事件

## 1 Promise

executor 函数会被立即执行，里面往往会是一个异步函数

```js
let promise = new Promise(function (resolve, reject) {})

promise.then((data) => {}).catch((error) => {})
```

## 2 then

```js
promise.then(
  function (result) {
    /* handle a successful result */
  },
  function (error) {
    /* handle an error */
  }
)
```

then()返回值

- 没有返回任何值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。实际业务中不返回值得 then 是没有任何价值的
- 返回了一个值，那么 then 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
- 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
- 返回一个已经是接受状态的 Promise，那么 then 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的 Promise 的接受状态回调函数的参数值。
- 返回一个已经是拒绝状态的 Promise，那么 then 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的 Promise 的拒绝状态回调函数的参数值。
- 返回一个未定状态（pending）的 Promise，那么 then 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的

## 3 catch

.catch(f) 调用是 .then(null, f) 的完全的模拟，它只是一个简写形式。

## 4 finally

调用 .finally(f) 类似于 .then(f, f)，因为当 promise settled 时 f 就会执行：无论 promise 被 resolve 还是 reject。
