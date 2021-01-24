1. 基础类型
```
number, string, boolean, null, undefined, symbol,bigInt
```

2. typeof
+ typeof 对于基本类型，除了 null 都可以显示正确的类型
+ typeof 对于对象，除了函数都会显示 object
+ 对于 null来说，虽然它是基本类型，但是会显示 object，这是一个存在很久了的 Bug
+ 如果我们想获得一个变量的正确类型，可以通过 Object.prototype.toString.call(xx)。这样我们就可以获得类似 [object Type] 的字符串。

3. 类型转化
+ 在条件判断时，除了 undefined， null， false， NaN， ''， 0， -0，其他所有值都转为 true，包括所有对象
+ 只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型。其他运算只要其中一方是数字，那么另一方就转为数字。并且加法运算会触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串

4. 原型
+ 每个函数都有 prototype 属性，除了 Function.prototype.bind()，该属性指向原型。
+ 每个对象都有 __proto__属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 [[prototype]]，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使用 _proto_ 来访问。
+ 对象可以通过__proto__ 来寻找不属于该对象的属性，__proto__ 将对象连接起来组成了原型链
```
let a = '123';
a.__proto__ === String.prototype;
a.__proto__.__proto__ === Object.prototype
a.__proto__.__proto__.__prototype === null
```

5. new
```
function create() {
  let obj = new Object();
  const Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  let result = Con.apply(obj, arguments);;
  return typeof result === 'object' ? result : obj
}
```

6. instanceof
instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype
```
function myInstanceof(a, b) {
  if(!b) {
    return false;
  }
  let prototype = b.prototype;
  let proto = a.__proto__;
  while(proto) {
    if(proto===prototype) {
      return true;
    } else {
      proto = proto.__proto__;
    }
  }
  return false;
}
```

7. this
箭头函数其实是没有 this 的, 已经按照词法作用域绑定了，这个函数中的 this 只取决于他外面的第一个不是箭头函数的函数的 this。并且 this 一旦绑定了上下文，就不会被任何代码改变

8. 执行上下文


