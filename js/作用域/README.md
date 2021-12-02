# 作用域
作用域就是变量绑定(name binding)的有效范围
## 1.静态作用域
静态作用域又叫词法作用域，JS就是静态作用域  
如果这个函数的变量没有在函数中定义，就去**定义该函数的地方查找**，这种查找关系在我们代码写出来的时候其实就确定了，所以叫静态作用域
```javascript
let x = 10;

function f() {
  return x;
}

function g() {
  let x = 20;
  return f();
}

console.log(g());  // 10 x会取他定义时候的值，也就是let x = 10
```
## 2.声明提前

1. 变量声明提前
```javascript
var x = 1;
function f() {
  console.log(x);
  var x = 2;
}

f(); // undefined
```

2. 函数声明提前
```javascript
function f() {
  x();

  function x() {
    console.log(1);
  }
}

f(); // 1
```

3. 函数优先级比变量高
```javascript
var x = 1;
function x() {}

console.log(typeof x);  // number
```

## 3.块级作用域
也会有提升-暂存性死区
```javascript
function f() {
  let y = 1;

  if(true) {
    var x = 2;
    let y = 2;
  }

  console.log(x);   // 2
  console.log(y);   // 1
}

f();
```

## 4.作用域链延长
```javascript
let x = 1;
try {
  x = x + y;
} catch(e) {
  console.log(e);
}
```