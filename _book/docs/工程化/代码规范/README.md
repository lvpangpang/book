## 代码规范

eslint
代码质量问题：使用方式有可能有问题(problematic patterns)
代码风格问题：风格不符合一定规则 (doesn’t adhere to certain style guidelines)

prettier
代码风格问题：风格不符合一定规则 (doesn’t adhere to certain style guidelines)

1. 安装 eslint

```js
npm i eslint -g
cd 项目路径
eslint --init (选择你所需要的)
eslint --ext .ts,.tsx src/（检查你的代码）
```

vscode 中安装 eslint 插件(Vscode 需要重启才生效，然后你就能在 vscode 里面看到格式错误的提示了)

2. 结合 git

```js
npm i husky --D
// package.json中加入以下配置
"scripts": {
  "lint": "eslint --ext .ts,.tsx src/"
},
"husky": {
  "hooks": {
    "pre-commit": "npm run lint"
  }
}
```

现在在进行 git commit 的时候 先去执行 pre-commit 里面的命令 ： 我们在这里输出 husky 并且执行 npm run lint (我们之前加上的验证 eslint 的命令)，如果 eslint 验证通过了，则会进行 commit 操作，否则会报 eslint 的错误提示

4. 如果只进行到第三步的话，你会发现你改一行代码，在提交的时候会报错 N 个（整个项目的不规范代码都会报错，这时候你的第一反应就是删除 eslint 哈哈）。这时候就需要对本次修改的代码进行检查。

```js
npm i lint-staged -D
// package.json中加入以下配置
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{jsx,tsx,ts,js}": [
    "eslint",
    "git add"
  ]
}
```
