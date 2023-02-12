# 防抖

一定时间内，当一个动作连续触发，只执行最后一次

```js
function debounce(fn, time) {
  let timer = null
  return function () {
    if (timer) {
      // 与节流的区别在这
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments) // 借助箭头函数没有this以及arguments的特点
      timer = null
    }, time || 300)
  }
}
```

# 节流

一定时间内，当一个动作连续触发，只执行第一次

```js
function throttle(fn, time) {
  let timer = null
  return function () {
    if (timer) {
      // 与节流的区别在这里
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments) // 借助箭头函数没有this以及arguments的特点
      timer = null
    }, time || 300)
  }
}
```
