# 刘海屏

## 1.viewport-fit

viewport-fit 是 IOS 11 新增的css特性，关于 viewport-fit 的枚举值介绍如下：

- contain: 可视窗口完全包含网页内容（左图）
- cover：网页内容完全覆盖可视窗口（右图）
- auto：默认值，跟 contain 表现一致

这一点其实主要是在 WebView 里面需要注意，因为微信 原生浏览器都会有头脚。
一般 Webview 会将上面的区域不对外开发，下面的区域对外开放

## 2.env() 和 constant()

安全区域的位置信息通过 css 常量的方式暴露给了开发者，这些 css 常量需要用 env() 和 constant()这两个函数来包裹就可以拿到了
IOS 11.0-11.2 是支持 constant 函数的，在 11.3 往后是废弃了 constant 函数，取而代之的是 env 函数。
一般情况 2 个都要写。并且这 2 个函数起作用的前提是有 viewport-fit：cover 属性

## 3.适配方案

这里主要说一下 WebView 里面的适配方案，因为微信，原生浏览器里面根本不用我们适配。

1. fixed 头部

- 判断在 ios 并且处在 app 环境中的时候加一个特定的类名，比如：iphone-head-nav
- 给 iphone-head-nav 加一个 padding-top 值空出来顶部安全距离

```css
.iphone-head-nav {
  padding-top: 20px; // iphonex系列机型之前顶部安全距离均为20px
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
```

2. fixed 底部(一般都是吸底按钮)
   因为在 iphonex 上，按钮 bottom 为底部安全距离，那和最下面就会有一段镂空的空档，所以还需要把这个空档给补上。

```css
.btn {
  position: fixed;
  bottom: 0; // 当constant和env函数都不支持的时候，这个会生效
  bottom: constant(safe-area-inset-bottom);
  bottom: env(safe-area-inset-bottom);
  &:after {
    content: ' ';
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
  }
}
```

## 4.实际情况

我所在的客户端团队，H5 页面顶部直接被限定在安全距离内，底部是会被小黑条挡住的。(这种发方式最保守)

- 这种情况只需要把 body 底部留一个 30px 的 padding 即可(设计稿一般都会有留底的)。
- 如果有吸底按钮的只需要保证按钮高度胖一点即可，不用做特殊处理

## 5.总结

所谓的刘海屏适配，本质就是给元素添加 env 函数获取到的长度，让元素不被刘海或者小黑条挡住
