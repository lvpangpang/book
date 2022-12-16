# Webpack

## 1. 原理篇

webpack 本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是 Tapable。

Webpack 的 Tapable 事件流机制保证了插件的有序性，将各个插件串联起来， Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条 webapck 机制中，去改变 webapck 的运作，使得整个系统扩展性良好。

webpack 中最核心的负责编译的 Compiler 和负责创建 bundles 的 Compilation 都是 Tapable 的实例，可以直接在 Compiler 和 Compilation 对象上广播和监听事件

- Compiler 对象包含了当前运行 Webpack 的配置，包括 entry、output、loaders 等配置，这个对象在启动 Webpack 时被实例化，而且是全局唯一的。Plugin 可以通过该对象获取到 Webpack 的配置信息进行处理。
- Compilation 对象代表了一次资源版本构建。

## 1.1 执行过程

1. 初始化参数： 从配置文件和 Shell 语句中读取与合并参数，得到最终的参数
2. 初始化 Compiler 编译对象：该对象掌控者 webpack 声明周期，不执行具体的任务，只是进行一些调度工作

```js
class Compiler extends Tapable {
    constructor(context) {
        super();
        this.hooks = {
            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            afterCompile: new AsyncSeriesHook(["compilation"]),
            make: new AsyncParallelHook(["compilation"]),
            entryOption: new SyncBailHook(["context", "entry"])
            // 定义了很多不同类型的钩子
        };
        // ...
    }
}

function webpack(options) {
  var compiler = new Compiler();
  ...// 检查options,若watch字段为true,则开启watch线程
  return compiler;
}
...
```

3. 开始编译： 用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译。初始化完成后会调用 Compiler 的 run 来真正启动 webpack 编译构建流程，主要流程如下：

- compile 开始编译
  执行了 run 方法后，首先会触发 compile，主要是构建一个 Compilation 对象
  该对象是编译阶段的主要执行者，主要会依次下述流程：执行模块创建、依赖收集、分块、打包等主要任务的对象

- make 从入口点文件开始分析模块及其依赖的模块，创建这些模块对象
  当完成了上述的 compilation 对象后，就开始从 Entry 入口文件开始读取，主要执行 addModuleChain()函数

- build-module 构建模块
  这里主要调用配置的 loaders，将我们的模块转成标准的 JS 模块
  在用 Loader 对一个模块转换完后，使用 acorn 解析转换后的内容，输出对应的抽象语法树（AST），以方便 Webpack 后面对代码的分析
  从配置的入口模块开始，分析其 AST，当遇到 require 等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系

- seal 封装构建结果
  seal 方法主要是要生成 chunks，对 chunks 进行一系列的优化操作，并生成要输出的代码
  webpack 中的 chunk ，可以理解为配置在 entry 中的模块，或者是动态引入的模块

- emit 把各个 chunk 输出到结果文件

简单说：

- 初始化： 从启动构建，读取与合并配置参数，加载 Plugin， 实例化 Compiler
- 编译： 从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module ，递归地进行编译处理
- 输出： 将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中。

## 1.2 loader 编写

```js
import { getOptions } from 'loader-utils' // 常用loader开发辅助库
module.exports = function loader(source) {
  const options = getOptions(this)
  source = source.replace(/\[name\]/g, options.name)
  return `export default ${JSON.stringify(source)}`
}
```

### 1.3 pulgins 编写

我们编写插件前，需要知道我们插件是在什么时候去被调用。这个就需要了解 webpack 中提供的重要钩子函数有哪些：

- compiler.hooks.compilation：启动编译创建出 compilation 对象后触发
- compiler.hooks.make：正式开始编译时触发
- compiler.hooks.emit：输出资源到 output 目录前执行
- compiler.hooks.afterEmit：输出资源到 output 目录后执行
- compiler.hooks.done：编译完成后触发

```js
class HelloPlugin {
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options) {}
  // Webpack 会调用 HelloPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler) {
    compiler.hooks.emit.tap('HelloPlugin', (compilation) => {})

    // 异步的情况多一个callback，一定要调用
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      // 4.在钩子函数中处理webpack中的数据
      console.log('处理webpack中的数据')
      // 5.处理数据完成后，需要调用webpack提供的回调
      callback()
    })
  }
}

module.exports = HelloPlugin
```

### 1.4 ES6 转 ES5 的过程

- 将代码字符串解析成抽象语法树，即所谓的 AST
- 对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
- 根据处理后的 AST 再生成代码字符串

可以使用 @babel/parser 的 parse 方法，将代码字符串解析成 AST；
使用 @babel/core 的 transformFromAstSync 方法，对 AST 进行处理，将其转成 ES5 并生成相应的代码字符串；
过程中，可能还需要使用 @babel/traverse 来获取依赖文件等。

## 2. 使用篇

## 2.1 垫片处理

1. 开发业务代码

```js
yarn add core-js
presets: [
  [
    '@babel/preset-env',
    {
      modules: false,
      targets: {
        browsers: ['> 1%', 'last 2 versions'],
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
]
```

1. 开发第三方库

```js
yarn add @babel/runtime
yarn add @babel/plugin-transform-runtime --D
"plugins": [
  [
    "@babel/plugin-transform-runtime"
  ]
]
```

## 2.2 环境变量

- shell 写入环境变量

```json
"start": "webpack-react-admin env=sat"
```

- webpack 中设置获取到的变量到业务代码全局

```js
// 获取shell参数
function getProcessArgv(name) {
  const argv = process.argv
  const obj = {}
  argv.forEach((item) => {
    if (item.indexOf('=') > -1) {
      const [key, value] = item.split('=')
      obj[key] = value
    }
  })
  return name ? obj[name] : obj
}
plugins: [
  new Webpack.DefinePlugin({
    __ENV__: JSON.stringify(getProcessArgv()),
  }),
]
```

业务代码直接读取 __ENV__ 变量就好了，注意，一定要在 webpack 中设置，才能实现 Web 端读取 Node 端设置的变量

## 2.3 打包优化方式

1. 优化 Loader 的文件搜索范围

```js
module.exports = {
  module: {
    rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        loader: 'babel-loader',
        // 只在 src 文件夹下查找
        include: [resolve('src')],
        // 不会去查找的路径
        exclude: /node_modules/,
      },
    ],
  },
}
```

2. 外置第三方库

```js
  externals: {
    react: 'React',
  }
```
