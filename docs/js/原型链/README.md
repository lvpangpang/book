# 原型链

原型链将整个js世界连接起来

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

## __proto__
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
## constructor
这个属性就指向类函数本身，用于指示当前类的构造函数

## 静态方法
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

## 继承
子类能够继承父类的属性和方法
子类能够找到父类的prototype
```javascript
function Person(name) {
  this.name = name;    
}
Person.prototype.say = () => {}

function person(name) {
  Person.call(this, name);    
}

person.prototype = Object.create(Person.prototype);         
person.prototype.constructor = person;      
```

## new
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
## instanceof
检测一个实例对象是不是某个类的实例
换句话，就是对象的原型链上是否有这个类的prototype
```javascript
function myInstanceof(a, A) {
  let __proto = a.__proto__
  let prototype = A.prototype
  while (prototype) {
    if (__proto === prototype) {
      return true
    }
    __proto = __proto.__proto__
  }
  return false
}
```
