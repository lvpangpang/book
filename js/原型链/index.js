function myInstanceOf(a, A) {
  let prototype = A.prototype
  let __proto = a.__proto__
  while (__proto) {
    if (__proto === prototype) {
      return true
    }
    __proto = __proto.__proto__
  }
  return false
}
