## call

```js
Function.prototype.myCall = function (context) {
  context = context ? Object(context) : window
  context.fn = this

  // 执行该函数
  let args = [...arguments].slice(1)
  let result = context.fn(...args)

  // 删除该函数
  delete context.fn
  // 注意：函数是可以有返回值的
  return result
}
```

## apply

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
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  var args = Array.prototype.slice.call(arguments, 1)
  var fn = this
  //创建中介函数
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
