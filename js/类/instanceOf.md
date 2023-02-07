# instanceof

instanceof -检查构造函数的 prototype 对象是否出现在某个实例对象的原型链上。

```js
obj instanceof Class
```

实现原理

```js
function myInstanceOf(objA, classA) {
  let __proto = Object.getPrototypeOf(objA)
  const __prototype = classA.prototype
  while (__proto !== null) {
    if (__proto === __prototype) {
      return true
    }
    __proto = Object.getPrototypeOf(__proto)
  }
  return false
}
```
