# try+catch+finally

1. 只能捕获同步错误

无法捕获异步错误
因为 try...catch 包裹了计划要执行的函数，该函数本身要稍后才执行，这时引擎已经离开了 try...catch 结构。

```js
try {
  setTimeout(function () {
    noSuchVariable // 脚本将在这里停止运行
  }, 1000)
} catch (err) {
  alert('不工作')
}
```

改成下面这种才可以正常工作

```js
setTimeout(function () {
  try {
    noSuchVariable // try...catch 处理 error 了！
  } catch {
    alert('error 被在这里捕获了！')
  }
}, 1000)
```

2. finally
   当我们开始做某事的时候，希望无论出现什么情况都要完成完成某个任务。
   finally 子句适用于 try...catch 的 任何 出口。即使在 try 中写了 return， finally 代码都会执行。

```js
function func() {
  try {
    return 1
  } catch (err) {
    /* ... */
  } finally {
    // 不管发生什么我都要执行
    alert('finally')
  }
}

alert(func()) // 先执行 finally 中的 alert，然后执行这个 alert
```
