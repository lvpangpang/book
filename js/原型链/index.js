// 原型查找
// var a = 'abc'
// console.log(a.__proto__===String.prototype) // true
// console.log(String.prototype.__proto__===Object.prototype) // true
// console.log(Object.prototype.__proto__===null) // true

// var b = 1234
// console.log(b.__proto__===Number.prototype) // true
// console.log(Number.prototype.__proto__===Object.prototype) // true
// console.log(Object.prototype.__proto__===null) // true

// 继承
function Person(name) {
  this.name = name
}

Person.prototype.say = function () {
  console.log(this.name)
}

function Man(name, age) {
  this.age = age
  Person.call(this, name)
}
Man.prototype = Object.create(Person.prototype)
Man.prototype.constructor = Man
Man.prototype.say = function () {
  console.log(this.age)
}

let person1 = new Person('王大熊')
console.log(person1.say())
let man1 = new Man('吕肥肥', 2)
let man2 = new Man('鱼多多', 1)
console.log(man1)
console.log(man2)
