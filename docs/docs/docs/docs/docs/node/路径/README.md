# 路径

## 1. 获取路径

1. __dirname

返回源代码所在的目录

2. process.cwd()

调用 node 命令执行脚本时的目录

## 2. 拼接路径

1. path.join()

   path.join()方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。

2. path.resolve()

   参数从后向前，
   若字符以 / 开头，不会拼接到前面的路径；
   若以 ../ 开头，拼接前面的路径，但是不含前面一节的最后一层路径；
   若以 ./ 开头 或者没有符号 则拼接前面路径；

```javascript
// node文件夹为执行文件夹
console.log(path.resolve('/abc.js')) // C:\abc.js
console.log(path.resolve('abc.js')) // C:\Users\86157\Desktop\吕肥肥的github\book\node\abc.js
```
