# filter

```js
Array.prototype.myFilter = function (callbackFn) {
  var _arr = this,
    thisArg = arguments[1] || window
  res = []
  for (var i = 0; i < _arr.length; i++) {
    if (callbackFn.call(thisArg, _arr[i], i, _arr)) {
      res.push(_arr[i])
    }
  }
  return res
}
```
