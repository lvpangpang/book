#### 闭包
1. 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）


#### 相关面试题
1. 累加函数
```
function add() {
  let res = 0;
  return () => {
    return ++res;
  }
}
```
2. 使用闭包的方式实现一个累加函数 addNum，如： addNum(10); //10 addNum(12); //22 addNum(30); //52  
```
function addBy() {
  let _num = 0;
  return function res(num1) {
    _num += num1;
    return _num;
  }
}
let b = addBy();
console.log(b(1))
console.log(b(2))
console.log(b(3))
```
