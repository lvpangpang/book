# instanceOf

函数 A 的 prototype 对象是否会出现在实例 a 的原型链上

typeof 和 instanceof 区别

- typeof 对于原始类型来说，除了 null 都可以显示正确的类型
- typeof 对于对象来说，除了函数都会显示 object
- instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```javascript
function instanceOf(a, A) {
  let prototype = A.prototype
  let __proto = a.__proto
  while (__proto) {
    if (__proto === prototype) {
      return true
    }
    __prto = __proto.__proto__
  }
  return false
}
```
