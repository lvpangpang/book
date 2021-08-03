// 1. prototype
function Person(name) {
  this.name = name
}
Person.prototype.say = function () {
  return this.name
}
Person.run = function () {}
const personA = new Person('肥肥')
console.log(personA.say())
console.log(personA.__proto__)
console.log(personA.__proto__ === Person.prototype)
console.log(personA.run)

