# webpack
## 1.知识点
1. babel
react+ts项目，使用babel预设-@babel/preset-typescript来编译ts，而也可以直接不需要typescript包，之前用ts-loader来转化，babel的按需加载功能就会丧失。

2. corejs
在babel-laoder中不能编译corejs
```
include: [path.resolve(`${cwd}/src`)],
```
```
presets: [
  [
    "@babel/preset-react",
    {
      runtime: "automatic",
    },
  ],
  [
    "@babel/preset-env",
    {
      modules: false,
      targets: {
        browsers: ["> 1%", "last 2 versions"],
      },
      useBuiltIns: "usage",
      corejs: 3,
    },
  ],
  "@babel/typescript",
]
```

3. 执行过程
+ 初始化参数： 从配置文件和Shell语句中读取与合并参数，得到最终的参数
+ 开始编译： 用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
+ 确定入口： 根据配置中的 entry 找到所有的入口文件
+ 编译模块： 从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
+ 完成模块编译： 在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
+ 输出资源： 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk, 再把每个 Chunk 转换为一个单独的文件加载到输出列表，这步是可以修改输出内容的最后机会。
+ 输出完成： 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入文件系统。

简单说：
+ 初始化： 从启动构建，读取与合并配置参数，加载 Plugin， 实例化 Compiler
+ 编译： 从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 + Module 依赖的 Module ，递归地进行编译处理
+ 输出： 将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中。

4. loader编写
```
import { getOptions } from 'loader-utils';
export default function loader(source) {
  const options = getOptions(this);
  source = source.replace(/\[name\]/g, options.name);
  return `export default ${ JSON.stringify(source) }`;
};
```

5. pulgins编写
```
function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
}
HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
};
module.exports = HelloWorldPlugin;
```

6. webpack-dev-server和webpack-dev-middleware的区别
+ webpack-dev-server = webapck-dev-middleware + express
+ webpack-hot-middleware是一个结合webpack-dev-middleware使用的middleware，它可以实现浏览器的无刷新更新（hot reload），这也是webpack文档里常说的HMR（Hot Module Replacement）。HMR和热加载的区别是：热加载是刷新整个页面。


7. ES6转ES5的过程
+ 将代码字符串解析成抽象语法树，即所谓的 AST
+ 对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
+ 根据处理后的 AST 再生成代码字符串

可以使用 @babel/parser 的 parse 方法，将代码字符串解析成 AST；使用 @babel/core 的 transformFromAstSync 方法，对 AST 进行处理，将其转成 ES5 并生成相应的代码字符串；过程中，可能还需要使用 @babel/traverse 来获取依赖文件等。

8. 环境变量
在业务代码里面请求域名的时候经常会用到环境变量来判断请求哪个域名
* 执行命令的时候声明环境变量
```
"start": "cross-env __ENV__=development webpack-dev-server --open --config webpack.dev.js"
```
* webpack中设置获取到的变量到业务代码全局
```javascript
plugins: [
  new webpack.definePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.__ENV__)
  }),
  ...
]
```

* 业务代码直接读取__ENV__变量就好了，注意，一定要在webpack中设置，才能读取到，因为 process.env这个东东只在node环境中才有的
## 2.打包优化方式
### 减少 Webpack 打包时间

1. 优化 Loader
优化 Loader 的文件搜索范围
```
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
        exclude: /node_modules/
      }
    ]
  }
}
```

文件缓存
```
loader: 'babel-loader?cacheDirectory=true'
```

2. HappyPack
HappyPack 可以将 Loader 的同步执行转换为并行的，这样就能充分利用系统资源来加快打包效率了

3. DllPlugin
DllPlugin 可以将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。

4. 代码压缩
在 Webpack4 中，我们就不需要以上这些操作了，只需要将 mode 设置为 production 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 console.log 这类代码的功能。

### 减少 Webpack 打包后的文件体积

1. 按需加载
使用按需加载，将每个路由页面单独打包为一个文件

2. Tree Shaking-树摇
你使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。