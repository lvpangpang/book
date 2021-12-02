# New

```js
function myNew(fn, ...args) {
  let obj = {}
  const result = fn.call(fn, ...args) // 构造函数
  obj.__proto__ = fn.prototype // 原型链

  // 注意如果原构造函数有Object类型的返回值，包括Functoin, Array, Date, RegExg, Error
  // 那么应该返回这个返回值
  const isObject = typeof result === 'object' && result !== null
  const isFunction = typeof result === 'function'
  if (isObject || isFunction) {
    return result
  }
  
  return obj
}
```
