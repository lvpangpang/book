# NPM

## 1 bin

它是一个命令名和本地文件名的映射。在安装时，如果是全局安装，npm 将会使用符号链接把这些文件链接到 prefix/bin，如果是本地安装，会链接到./node_modules/.bin/。
**通俗点理解就是我们全局安装， 我们就可以在命令行中执行这个文件， 本地安装我们可以在当前工程目录的命令行中执行该文件。("scripts"里面)**

本地安装可以用下面 2 种方式执行命令

```js
"scripts": {
  "start": "gulp-admin start",
  "build": "gulp-admin build"
},
```

或者直接在控制台执行

```js
./node_modules/.bin/gulp-admin start
```

## 2 scripts

npm 脚本的原理非常简单。每当执行 npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。
比较特别的是，npm run 新建的这个 Shell，会将当前目录的 node_modules/.bin 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样。

## 3 包版本依赖

^1.2.1 := >=1.2.1 <2.0.0(可以改变后 2 位)
~1.2.1 := >=1.2.1 <1.3.0(只能改变最后一位)

## 4 环境入口

main : 定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
module : 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用
browser : 定义 npm 包在 browser 环境下的入口文件

## 5 npm run dev 发生了什么

1. 执行 package.json 中 scripts 对象中 key 为 dev 的命令

   ```json
   "scripts": {
    "dev": "gulp-admin dev",
   },
   ```

2. 本地安装的 gulp-admin 包会在 node_modules 中的.bin 文件夹中新建可执行脚本，会将当前目录的 node_modules/.bin 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样。
3. gulp-admin 这个命令是 gulp-admin 这个包通过 bin 字段暴露出来给用户使用的，最终都是调用 gulp-admin 中某个入口 js 来完成任务

## 6 yarn create

先安装create-react-app再初始化项目

```js
npx create-react-app my-app --typescript
yarn create react-app my-app --typescript
```

等价于下面两行命令

```js
yarn global add create-react-app
create-react-app my-app
```
