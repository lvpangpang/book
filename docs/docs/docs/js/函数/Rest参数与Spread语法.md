# Rest 参数与 Spread 语法

## 1 Rest 参数 ...

在 JavaScript 中，无论函数是如何定义的，你都可以在调用它时传入任意数量的参数。
Rest 参数表示剩余参数的意思，必须放到参数列表的末尾

```js
function sumAll(...args) {
  // 数组名为 args
  let sum = 0

  for (let arg of args) sum += arg

  return sum
}
```

## 2 “arguments” 变量

有一个名为 arguments 的特殊类数组对象可以在函数中被访问，该对象以参数在参数列表中的索引作为键，存储所有参数。
箭头函数没有 "arguments"
如果我们在箭头函数中访问 arguments，访问到的 arguments 并不属于箭头函数，而是属于箭头函数外部的“普通”函数。

```js
function sumAll() {
  // 数组名为 args
  let sum = 0

  for (let arg of arguments) sum += arg

  return sum
}
```

## 3 Spread 语法

我们刚刚看到了如何从参数列表中获取数组。

有时候我们也需要做与之相反的事。

可以做浅拷贝之类的事情。

```js
let arr = [1, 2, 3]

let arrCopy = [...arr]
```
