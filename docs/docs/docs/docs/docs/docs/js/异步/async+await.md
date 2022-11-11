# async/await

## 1 async

即这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。

```js
async function f() {
  return 1
}
f().then(alert)
```

## 2 await

关键字 await 让 JavaScript 引擎等待直到 promise 完成（settle）并返回结果。  
await 下面的代码相当于在 then 里面是微任务

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000)
  })

  let result = await promise // 等待，直到 promise resolve (*)

  alert(result) // "done!"
}

f()
```
