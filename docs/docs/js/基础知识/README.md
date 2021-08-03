# 基础知识
## 1.原始类型
* number
* string
* undefined
* null
* boolean
* symbol
* BigInt

## 2.对象类型

对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）
```
function test(person) {
  person.age = 28
  person = {
    name: '王大熊',
    age: 30
  }
  return person
}

const p1 = {
  age: 24,
  name: '吕肥肥
}

const p2 = test(p1)
console.log(p1) // { age: 28, name: '吕肥肥'}
console.log(p2) // { age: 30, name: '王大熊'}
```
## 3. typeof vs instanceof
* typeof 对于原始类型来说，除了 null 都可以显示正确的类型
* typeof 对于对象来说，除了函数都会显示 object
* instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
代码详见 code.js-1.实现Instanceof

## 4. 原型
可以类比链表
* 每个函数都有 prototype 属性，除了 Function.prototype.bind()，该属性指向原型。
* 每个对象都有 __proto__属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 [[prototype]]，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使用 _proto_ 来访问。
* 对象可以通过__proto__ 来寻找不属于该对象的属性，__proto__ 将对象连接起来组成了原型链
```
let a = '123';
a.__proto__ === String.prototype;
a.__proto__.__proto__ === Object.prototype
a.__proto__.__proto__.__prototype === null
```

## 5. 双问号+双感叹号
* value1 ?? value2。只有当value1为null或者 undefined时取value2，否则取value1（0,false,""被认为是有意义的，所以还是取value1）
```javascript
var a = 1
var b = 2
a ?? b // 1
```

* !!将其他类型都转换成boolean型 
```javascript
var a = 1
!!a // true
```

## 6. 垃圾回收
1. 标记清除法
标记-清除算法就是当变量进入环境是，这个变量标记位“进入环境”；而当变量离开环境时，标记为“离开环境”，当垃圾回收时销毁那些带标记的值并回收他们的内存空间。这里说的环境就是执行环境，执行环境定义了变量或函数有权访问的数据。每个执行环境都有一个与之关联的变量对象（variable object），环境中所定义的所以变量和函数都保存在这个对象中。某个执行环境中所有代码执行完毕后，改环境被销毁，保存在其中的所有变量和函数也随之销毁。
2. V8的内存管理
V8采用了分代回收的策略，将内存分为两个生代：新生代和老生代

## 转码
1. encodeURI方法不会对下列字符编码 ASCII字母 数字 ~!@#$&*()=:/,;?+'
2. encodeURIComponent方法不会对下列字符编码 ASCII字母 数字 ~!*()'
3. 所以encodeURIComponent比encodeURI编码的范围更大
4. 如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。
5. 当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。