# 微信小程序

## 1 双线程架构：渲染层和逻辑层

1. 渲染层的界面使用了 WebView 进行渲染
2. 逻辑层采用 JsCore 线程运行 JS 脚本

## 2. 刘海屏适配

小程序里面默认是有顶部导航栏的，这时候最顶部是不需要自己特殊处理的
当我们设置自定义导航栏的时候

```javascript
navigationStyle: 'custom'
```

需要手动获取顶部状态栏的高度

```javascript
const statusBarHeight = Taro.getSystemInfoSync()['statusBarHeight']
```

和 H5 里面处理刘海屏一样，都是根据指定的 API 获取顶部状态栏高度，然后给 View 设置一个 padding-Top 即可
