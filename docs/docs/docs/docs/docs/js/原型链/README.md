# 原型链

原型链将整个js世界连接起来
实例的原型属性__proto__===构造函数的原型对象prototype,直到null

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
子类能够继承父类的属性和方法
子类能够找到父类的prototype
```javascript
function Person(name) {
  this.name = name;    
}
Person.prototype.say = () => {}

function person(name) {
  Person.call(this, name); // 继承属性
}
// 如果直接复制的话，修改person.prototype.say 方法会影响父类的say方法，
// 因为对象直接复制造成多个对象的指针指向堆中同一个对象
// person.prototype = Person.prototype;   
// 继承方法
// Object.create()会创建一个新的对象newObj，并让这个newObj的原型指向传入的参数proto
person.prototype = Object.create(Person.prototype);    
person.prototype.constructor = person;   // 构造函数指回自己  
```
## 6.Object.create(obj)
创建一个新的对象newObj，并让这个newObj的原型指向(__proto__)传入的参数的obj
```javascript
var a = { name: 1}
var b = Object.create(a)
b // {}
b.name // 1
a === b // false
b.__proto__ = a
```
## 7.new
```javascript
function myNew(func, ...args) {
  const obj = {};     // 新建一个空对象
  const result = func.call(obj, ...args);  // 执行构造函数
  obj.__proto__ = func.prototype;    // 设置原型链

  // 注意如果原构造函数有Object类型的返回值，包括Functoin, Array, Date, RegExg, Error
  // 那么应该返回这个返回值
  const isObject = typeof result === 'object' && result !== null;
  const isFunction = typeof result === 'function';
  if(isObject || isFunction) {
    return result;
  }

  // 原构造函数没有Object类型的返回值，返回我们的新对象
  return obj;
}
```
## 8.instanceof
检测一个实例对象是不是某个类的实例
换句话，就是对象的原型链上是否有这个类的prototype
1. typeof和instanceof区别
* typeof 对于原始类型来说，除了 null 都可以显示正确的类型
* typeof 对于对象来说，除了函数都会显示 object
* instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
```javascript
function myInstanceof(a, A) {
  let proto = a.__proto__
  let prototype = A.prototype
  while(proto) {
    if(proto===prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}
```
