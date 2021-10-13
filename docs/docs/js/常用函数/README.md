# 常用函数

## 防抖

```javascript
function debounce(fn, time) {
  let timer = null
  return function () {
    let _this = this
    let arg = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(_this, arg) // 绑定this， 否则this指向window
    }, time || 300)
  }
}
```

## 节流

```javascript
function throttle(fn, time) {
  let timer = null
  return function () {
    let _this = this
    let arg = arguments
    if (timer) {
      return
    }
    timer = setTimeout(function () {
      fn.apply(_this, arg) // 绑定this， 否则this指向window
      timer = null
    }, time || 300)
  }
}
```

## 数组扁平化

```javascript
const arr = [1, [2, 3], [5, [6, 7], 8]]
function flat(arr, initArr) {
  const startArr = initArr || []
  return arr.reduce((sum, item) => {
    if(Array.isArray(item)) {
      return flat(item, sum)
    } else {
      return sum.concat(item)
    }
  }, startArr)
}
```
