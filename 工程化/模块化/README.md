# 模块化
## 1.模块类型 
到目前为止，对于编写源码来说，主流的方案只剩下三种。
* esm: 从 ES6 起官方规范自带的方案，编译时加载（静态加载）
* cjs: Node.js 使用的方案
* IIFE: 一个自动执行的功能，直接引入即可。（对于导出包来说，依赖视为已经准备好，直接从 window/global 取值并传入）

## 2.ES Modules
1. 静态的，不可以动态加载语句，只能声明在该文件的最顶部，代码发生在编译时
2. export导出的值是值的引用，并且内部有映射关系，这是export关键字的作用。而且导入的值，不能进行修改也就是只读状态
```javascript
// index.js
export let num = 0;
export function add() {
  ++ num
}

// test.js
import { num, add } from "./index.js"
console.log(num) // 0
add()
console.log(num) // 1
num = 10 // 抛出错误

```

## 3.Commonjs
1. 可以动态加载语句，代码发生在运行时
2. CommonJs导入的值是拷贝的，所以可以修改拷贝值，但这会引起变量污染，一不小心就重名 
```javascript
// index.js
let num = 0;
module.exports = {
  num,
  add() {
    ++ num 
  }
}

// test.js
let { num, add } = require("./index.js")
console.log(num) // 0
add()
console.log(num) // 0
num = 10

```
## 4.树摇
Tree-shaking的本质是消除无用的js代码
在 webpack 项目中，有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝。实际情况中，虽然依赖了某个模块，但其实只使用其中的某些功能。通过 tree-shaking，将没有使用的模块摇掉，这样来达到删除无用代码的目的。