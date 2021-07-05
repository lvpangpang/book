## JS 基础

1. 原始类型
+ number
+ string
+ undefined
+ null
+ boolean
+ symbol
+ BigInt

2. 对象类型
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

3. typeof vs instanceof
+ typeof 对于原始类型来说，除了 null 都可以显示正确的类型
+ typeof 对于对象来说，除了函数都会显示 object
+ instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
代码详见 code.js-1.实现Instanceof

4. 原型
可以类比链表
+ 每个函数都有 prototype 属性，除了 Function.prototype.bind()，该属性指向原型。
+ 每个对象都有 __proto__属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 [[prototype]]，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使用 _proto_ 来访问。
+ 对象可以通过__proto__ 来寻找不属于该对象的属性，__proto__ 将对象连接起来组成了原型链
```
let a = '123';
a.__proto__ === String.prototype;
a.__proto__.__proto__ === Object.prototype
a.__proto__.__proto__.__prototype === null
```

5. 双问号+ 双感叹号
+ value1 ?? value2。只有当value1为null或者 undefined时取value2，否则取value1（0,false,""被认为是有意义的，所以还是取value1）
```javascript
var a = 1
var b = 2
a ?? b // 1
```

+ !!将其他类型都转换成boolean型 
```javascript
var a = 1
!!a // true
```


