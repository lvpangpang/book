# instanceof

instanceof 操作符用于检查一个对象是否等于某个特定的 class 的实例

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
