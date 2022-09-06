# 异步

1. catch()是一个特殊的 then(null, () => {}),会捕获最近没有被捕获的的错误

```js
function ajax2() {
  return axios
    .get('https://qa01web-gateway.lingxichuxing.com/saas/v1/basic/dataTypes')
    .then(() => {
      return 1
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
```

2. then()返回值

- 返回了一个值，那么 then 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
- <font color=red>没有返回任何值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。实际业务中不返回值得then是没有任何价值的</font>
- 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
- 返回一个已经是接受状态的 Promise，那么 then 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的 Promise 的接受状态回调函数的参数值。
- 返回一个已经是拒绝状态的 Promise，那么 then 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的 Promise 的拒绝状态回调函数的参数值。
- <font color=red>返回一个未定状态（pending）的 Promise，那么 then 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。</font>
