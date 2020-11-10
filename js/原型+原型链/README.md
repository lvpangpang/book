#### 原型+原型链
1. 定义一个字符串a，那么a.__proto__ ==== String.prototype, 可以一直访问到null，这么的一条链就是原型链。
2. 所有对象都有__proto__属性, 只有函数对象有prototype属性。