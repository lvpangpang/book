# 常用 Node 库

## 1. glob

通过星号等 shell 所用的模式匹配文件。
主要用在获取某个目录下面的所有文件路径

```js
var glob = require('glob')
// options 可选
glob('**/*.js', options, function (er, files) {
  // files 是一个文件名数组。
  // 如果设置了选项 `nonull` 并且没有找到匹配，则 files 是 ["**/*.js"]
  // er 是一个错误对象或 null。
})
```

## 2. chalk

chalk 包的作用是修改控制台中字符串的样式，包括：
字体样式(加粗、隐藏等)
字体颜色
背景颜色

```js
const chalk = require('chalk')
console.log(chalk.red.bold.bgWhite('Hello World'))
```

## 3. chokidar

监听文件变化
chokidar 可以用于监控文件、文件夹变化，我们可以传入 glob 文件匹配模式，并可以简单实现递归目录监控。chokidar 可以监控各种文件、文件夹变化事件，包含 add , change , unlink , addDir , unlinkDir 等。

```js
const chokidar = require('chokidar')
const watcher = chokidar.watch('file, dir, glob, or array', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
})
watcher
  .on('add', (path) => log(`File ${path} has been added`))
  .on('change', (path) => log(`File ${path} has been changed`))
  .on('unlink', (path) => log(`File ${path} has been removed`))
  .on('all', (event, path) => console.log(event, path))
```

## 4. detect-port

端口检查器，当传入的端口号被占用会自动输出空闲的某一个可以使用的端口号

```js
const detect = require('detect-port')
detect(port, (err, _port) => {
  if (err) {
    console.log(err)
  }

  if (port == _port) {
    console.log(`port: ${port} was not occupied`)
  } else {
    console.log(`port: ${port} was occupied, try port: ${_port}`)
  }
})
```

## 5. fs-extra

Node 自带的 fs 模块的增强版
继承了 fs 所有方法和为 fs 方法添加了 promise 的支持。

```js
const fs = require('fs-extra')

// Async with promises:
fs.copy('/tmp/myfile', '/tmp/mynewfile')
  .then(() => console.log('success!'))
  .catch((err) => console.error(err))

// Async with callbacks:
fs.copy('/tmp/myfile', '/tmp/mynewfile', (err) => {
  if (err) return console.error(err)
  console.log('success!')
})

// Sync:
try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile')
  console.log('success!')
} catch (err) {
  console.error(err)
}

// Async/Await:
async function copyFiles() {
  try {
    await fs.copy('/tmp/myfile', '/tmp/mynewfile')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

copyFiles()
```

## 6. ip

专门用来处理 IP 地址的库

```js
const ip = require('ip')
console.log(ip.address())
```

## 7. open

自动在浏览器中打开一个网址（这个库其实可以干很多事情）

```js
const open = require('open')
open('https://www.baidu.com')
```

## 8. semver

版本号比较

```js
const semver = require('semver')
semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null
semver.clean('  =v1.2.3   ') // '1.2.3'
semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
semver.gt('1.2.3', '9.8.7') // false
semver.lt('1.2.3', '9.8.7') // true
semver.minVersion('>=1.0.0') // '1.0.0'
semver.valid(semver.coerce('v2')) // '2.0.0'
semver.valid(semver.coerce('42.6.7.9.3-alpha')) // '42.6.7'
```

## 9. shelljs

shelljs 模块重新包装了 child_process,调用系统命令更加简单
shelljs 是 Unix Shell 在 Node.js API 层的轻量级实现，可以支持 Windows、Linux、OS X。你可以像在 Unix 命令行敲命令一样书写代码

```js
var shell = require('shelljs')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

// Copy files to release dir
shell.rm('-rf', 'out/Release')
shell.cp('-R', 'stuff/', 'out/Release')

// Replace macros in each .js file
shell.cd('lib')
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file)
  shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file)
  shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file)
})
shell.cd('..')

// Run external tool synchronously
if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed')
  shell.exit(1)
}
```

## 10. dumi

为 React 组件开发场景而生的文档工具
只需要写 README 文件，就可以在浏览器里面看到优雅的组件文档

[文档地址](https://d.umijs.org/zh-CN)

## 11. father-build

father-build 是 dumi 内部的组件打包工具，目前只支持 React
支持 rollup 和 babel 2 种模式的组件打包
rollup 是根据 entry 把项目依赖打包在一起输出一个文件
babel 是把 src 目录转化成 lib（cjs） 或 es（esm）

[文档地址](https://github.com/umijs/father)

## 11. compressing

压缩单个文件以及文件夹

```js
compressing.zip
  .compressDir('/a', `./a.zip`, {
    ignoreBase: true, // 这个参数很关键，用于打包后去掉多余的a文件夹目录
  })
  .then(() => {
    shelljs.rm('-rf', `./a`)
  })
```
