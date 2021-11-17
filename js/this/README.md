# This
## 1.箭头函数
1. 箭头函数内部的this是词法作用域，由上下文确定。
2. 箭头函数本身并不具有this，箭头函数在被申明确定this，这时候他会直接将当前作用域（注意不是对象）的this作为自己的this
3. 箭头不能用作构造函数

## 2.call+apply+bind
1. call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
2. apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
3. bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。