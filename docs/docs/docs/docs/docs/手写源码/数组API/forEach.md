# forEach

```js
Array.prototype.myForEach = function (callbackFn) {
  var _arr = this,
    thisArg = arguments[1] || window
  for (var i = 0; i < _arr.length; i++) {
    callbackFn.call(thisArg, _arr[i], i, _arr)
  }
}
```
