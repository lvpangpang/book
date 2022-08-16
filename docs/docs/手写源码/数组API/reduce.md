# reduce

```js
Array.prototype.myReduce = function (callbackFn) {
  var _arr = this,
    accumulator = arguments[1],
    i = 0
  if (accumulator === undefined) {
    if (_arr.length === 0) {
      if (_arr.length === 0) {
        throw new Error('initval and Array.length>0 need one')
      }
      accumulator = _arr[i]
      i++
    }
  }
  for (; i < _arr.length; i++) {
    accumulator = callbackFn(accumulator, _arr[i], i, _arr)
  }
  return accumulator
}
```
