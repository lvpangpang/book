# 原型链

原型链将整个js世界连接起来
实例的原型属性(__proto__)===构造函数的原型对象(prototype),直到null

## 1.prototype
给构造函数添加一个prototype属性，然后该函数的实例对象就可以访问这个属性上面的所有方法了
```javascript
function Person(name) {
  this.name = name
}
Person.prototype.say = () => {
  return this.name
}
const personA = new Person('肥肥')
console.log(personA.say())
```
## 2.__proto__
实例对象通过这个属性可以获取到他构造函数对象prototype属性上面的所有方法
```javascript
function Person(name) {
  this.name = name
}
Person.prototype.say = () => {
  return this.name
}
const personA = new Person('肥肥')
console.log(personA.__proto__===Person.prototype) // true
```
## 3.constructor
这个属性就指向类函数本身，用于指示当前类的构造函数

## 4.静态方法
只有构造函数才能访问到，实例对象无法访问
```javascript
function Person(name) {
  this.name = name
}
Person.run = function() {

}
const personA = new Person('肥肥')
personA.run // undefined
```
## 5.寄生组合继承
```javascript
function Person(name) {
  this.name = name;    
}
Person.prototype.say = () => {}
function person(name) {
  Person.call(this, name); // 继承属性
}
person.prototype = Object.create(Person.prototype);    
person.prototype.constructor = person;   // 构造函数指回自己  
```
## 6.Object.create(obj)
创建一个新的对象newObj，并让这个newObj的原型(__proto__)指向传入的参数的obj
```javascript
var a = { name: 1}
var b = Object.create(a)
b // {}
b.name // 1
a === b // false
b.__proto__ === a // true
```

## 7.es6继承
```js

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
    super(name) // 正在构造我们自己的构造函数，那么我们必须调用 super，否则具有 this 的对象将不被创建，并报错。
    this.age = age
  }
}

var x = new X('王大熊', 2)
console.log(x.say()) // 王大熊， 2

```
