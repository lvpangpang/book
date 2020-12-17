#### webpack
1. babel
```
1. react+ts项目，使用babel预设-@babel/preset-typescript来编译ts，而已可以直接不需要typescript包，之前用ts-loader来转化，babel的按需加载功能就会丧失。
```

2. 垫片
2.1 @babel/polyfill
将useBuiltIns 改为 "usage"，babel 就可以按需加载 polyfill，并且不需要手动引入 @babel/polyfill(需要安装)
```
npm i @babel/polyfill
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

2.2 @babel/plugin-transform-runtime
```
npm i @babel/plugin-transform-runtime --D
npm i @babel/runtime-corejs2(由 core-js@2、@babel/helpers 和 regenerator-runtime 组成)
{
  "presets": [
    "@babel/preset-env"
  ]
  "plugins" : [
    "@babel/plugin-transform-runtime",
    {
      "corejs": 2
    }
  ]
}
```
