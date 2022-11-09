# New

创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

1. 创建一个空的简单 JavaScript 对象 obj；
2. 为 obj 添加属性**proto**，将该属性链接至构造函数的原型对象 ；
3. 将 obj 作为 this 的上下文来执行构造函数
4. 如果该函数没有返回对象，则返回 this。

```js
function myNew(Fn, ...args) {
  const obj = Object.create(Fn.prototype)
  const result = Fn.apply(obj, ...args)
  return result instanceof Object ? result : obj
}
```
