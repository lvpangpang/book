#### 原型+原型链
##### 知识点
1. 定义一个字符串a，那么a.__proto__ ==== String.prototype, 可以一直访问到null，这么的一条链就是原型链。
2. 所有对象都有__proto__属性, 只有函数对象有prototype属性。


##### 常见面试题
1. 描述new一个对象的过程
```
var a = new A();
var a = new Object();
a.__proto__ = A.prototype; // 重新绑定this，使构造函数的this指向新对象
A.call(a);
```

2. 原型继承
```
代码详见 code/原型继承.js
```

3. 原型链查找
```
Function.prototype.a = () => {
  console.log(1);
}
Object.prototype.b = () => {
  console.log(2);
}
function A() {}
const a = new A();
a.a(); // 报错，没有这个方法
a.b(); // 2
A.a(); // 1
A.b(); // 2
```
