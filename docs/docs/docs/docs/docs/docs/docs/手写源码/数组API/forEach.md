# forEach

```js
Array.prototype.myForEach = function (callbackFn) {
  if (this === null || this === undefined) {
    throw new TypeError('')
  }
  if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
    throw new TypeError(`${callbackFn} is not a function`)
  }
  var _arr = this,
    thisArg = arguments[1] || window
  for (var i = 0; i < _arr.length; i++) {
    callbackFn.call(thisArg, _arr[i], i, _arr)
  }
}
```
