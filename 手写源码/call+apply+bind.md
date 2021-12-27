## call

```js
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  const args = [...arguments].slice(1)
  return this(...args)
}
```

## apply

```js
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  return this(...arguments[1])
}
```

## bind

```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const args = [...arguments].slice(1)
  const _this = this

  return function () {
    return _this.apply(context, args.concat(...arguments))
  }
}
```
