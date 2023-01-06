# 模块化

## 1 模块类型

到目前为止，对于编写源码来说，主流的方案只剩下三种。

1. esm: 从 ES6 起官方规范自带的方案，编译时加载（静态加载）
2. cjs: Node.js 使用的方案
3. IIFE: 一个自动执行的功能，直接引入即可。（对于导出包来说，依赖视为已经准备好，直接从 window/global 取值并传入）

## 2 ES Modules

1. 静态的，不可以动态加载语句，只能声明在该文件的最顶部，代码发生在编译时
2. export 导出的值是值的引用，并且内部有映射关系，这是 export 关键字的作用。而且导入的值，不能进行修改也就是只读状态

```js
// index.js
export let num = 0
export function add() {
  ++num
}
// test.js
import { num, add } from './index.js'
console.log(num) // 0
add()
console.log(num) // 1 注意看这里，调用修改num的方法后发现num值变化了
num = 10 // 抛出错误
```

## 3 Commonjs

1. 可以动态加载语句，代码发生在运行时
2. CommonJs 导入的值是拷贝的，所以可以修改拷贝值，但这会引起变量污染，一不小心就重名

```js
// index.js
let num = 0
module.exports = {
  num,
  add() {
    ++num
  },
}

// test.js
let { num, add } = require('./index.js')
console.log(num) // 0
add()
console.log(num) // 0
num = 10
```

## 4 Tree-shaking

1. Tree-shaking 的本质是消除没有被使用到的 js 代码
2. 它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export
3. 在 webpack 项目中，有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝。实际情况中，虽然依赖了某个模块，但其实只使用其中的某些功能。通过 tree-shaking，将没有使用的模块摇掉，这样来达到删除无用代码的目的。
4. 通过 package.json 的 "sideEffects" 属性作为标记。我们就可以简单地将该属性标记为 false，来告知 webpack 它可以安全地删除未用到的 export。

```json
{
  "sideEffects": false
}
```
## 5 type="module"

与“常规”脚本相比，模块有什么不同呢？

1. 始终是严格模式
2. 块级作用域-一个模块中的顶级作用域变量和函数在其他脚本中是不可见的。
3. 模块代码仅在第一次导入被解析
4. “this” 是 undefined
5. 模块脚本是延迟的

## 6 动态导入

我们不能动态生成 import 的任何参数。
