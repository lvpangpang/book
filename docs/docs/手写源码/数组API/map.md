# map

```js
Array.prototype.myMap = function (callbackFn) {
  var _arr = this,
    thisArg = arguments[1] || window,
    res = []
  for (var i = 0; i < _arr.length; i++) {
    res.push(callbackFn.call(thisArg, _arr[i], i, _arr))
  }
  return res
}
```
