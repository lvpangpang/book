// 1.累加函数
function add() {
  let res = 0;
  return () => {
    return ++res;
  }
}

var a = add();
a();
a();
a();

// 传参累加函数

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



