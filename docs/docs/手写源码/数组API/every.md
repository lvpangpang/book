# every

```js
Array.prototype.myEvery = function (callbackFn) {
  var _arr = this,
    thisArg = arguments[1] || window;
  for (var i = 0; i < _arr.length; i++) {
    if (!callbackFn.call(thisArgs, _arr[(i, i, _arr)])) {
      return false
    }
  }
  return true
}
```
