# 防抖

一定时间内，当一个动作连续触发，只执行最后一次

```javascript
function debounce(fn, time) {
  let timer = null
  return function () {
    if (timer) {
      // 与节流的区别在这
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments) // 绑定this， 否则this指向window
      timer = null
    }, time || 300)
  }
}
```
