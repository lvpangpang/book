// 组合继承
function A(name) {
  this.name = name
}

A.prototype.say = function() {
  return this.name
}

function B(name) {
  A.call(this, name)
}

B.prototype = Object.create(A.prototype)
console.log(B.prototype)
B.prototype.constructor = B

var b = new B('吕肥肥')
console.log(b.say())


// es6继承

class S {
  constructor(name) {
    this.name = name
  }

  say() {
    return this.name + ', ' + this.age
  }
}

class X extends S {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}

var x = new X('王大熊', 2)
console.log(x.say())


