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
```

```


