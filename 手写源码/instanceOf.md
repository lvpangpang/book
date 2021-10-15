# instanceOf
函数A的prototype对象是否会出现在实例a的原型链上

```javascript
function instanceOf(a, A) {
  let prototype = A.prototype
  let __proto = a.__proto
  while(__proto) {
    if(__proto===prototype) {
      return true
    }
    __prto = __proto.__proto__
  }
  return false
}
```