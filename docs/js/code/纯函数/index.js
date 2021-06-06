function HOFO(fn) {
  return function(...args) {
    return fn.apply(this, args)
  }
}