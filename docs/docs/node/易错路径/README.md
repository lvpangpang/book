# 常用 API

## 1. 获取路径

1. \_\_dirname

返回源代码所在的目录

2. process.cwd()

调用 node 命令执行脚本时的目录

## 2. 拼接路径

1. path.join()

   连接路径的两个或多个部分

2. path.resolve()

   获得相对路径的绝对路径计算

```javascript
// node文件夹为执行文件夹
console.log(path.resolve('/abc.js')) // C:\abc.js
console.log(path.resolve('abc.js')) // C:\Users\86157\Desktop\吕肥肥的github\book\node\abc.js
```
