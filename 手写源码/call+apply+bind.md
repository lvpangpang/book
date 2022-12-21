## call

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

```js
Function.prototype.myCall = function (context, ...args) {
  context = context ? Object(context) : window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}
```

## apply

apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。

```js
Function.prototype.apply = function (context, arr) {
  context = context ? Object(context) : window
  context.fn = this
  let result
  if (!arr) {
    result = context.fn()
  } else {
    result = context.fn(...arr)
  }
  delete context.fn
  return result
}
```

## bind

```js
Function.prototype.bind_ = function (obj) {
  var args = Array.prototype.slice.call(arguments, 1)
  var fn = this
  var fn_ = function () {}
  var bound = function () {
    var params = Array.prototype.slice.call(arguments)
    //通过constructor判断调用方式，为true this指向实例，否则为obj
    fn.apply(this.constructor === fn ? this : obj, args.concat(params))
    console.log(this)
  }
  fn_.prototype = fn.prototype
  bound.prototype = new fn_()
  return bound
}
```
