// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链(实例对象一直找到null为止)
function myInstanceOf(a, b) {
  if(!a || !b) {
    return false;
  }
  let _proto = a.__proto__;
  let prototype = b.prototype;
  while(true) {
    if(_proto===null) {
      return false;
    }
    if(_proto===prototype) {
      return true;
    }
    _proto = _proto.__proto__;
  }
}

// 测试myInstanceOf
function A(name) {
  this.name = name;
}
let a = new A('吕肥肥');
console.log(myInstanceOf(a, A));
console.log(myInstanceOf(a, Object));
console.log(myInstanceOf(a, null));

// 原型查找实例(基础类型)
let str = '123';
str.__proto__ === String.prototype;
str.__proto__.__proto__ === Object.prototype;
str.__proto__.__proto__.__proto__ === null;

// 原型查找实例(复杂类型)
let object = {};
object.__proto__ === Object.prototype;
object.__proto__.__proto__ === null;





