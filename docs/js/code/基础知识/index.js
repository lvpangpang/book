function myInstanceof(a, A) {
  let __proto = a.__proto__
  let prototype = A.prototype
  while(prototype) {
    if(__proto===prototype) {
      return true
    }
    __proto = __proto.__proto__
  }
  return false
}