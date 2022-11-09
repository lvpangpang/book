# 刘海屏

## 1.viewport-fit
viewport-fit是 IOS 11 新增的特性，关于viewport-fit的枚举值介绍如下：
* contain: 可视窗口完全包含网页内容（左图）
* cover：网页内容完全覆盖可视窗口（右图）
* auto：默认值，跟 contain 表现一致

这一点其实主要是在WebView里面需要注意，因为微信 原生浏览器都会有头脚。
一般Webview会将上面的区域不对外开发，下面的区域对外开放

## 2.env() 和 constant()
安全区域的位置信息通过css常量的方式暴露给了开发者，这些css常量需要用env() 和 constant()这两个函数来包裹就可以拿到了
IOS 11.0-11.2是支持constant函数的，在11.3往后是废弃了constant函数，取而代之的是env函数。
一般情况2个都要写。并且这2个函数起作用的前提是有viewport-fit：cover属性

## 3.适配方案
这里主要说一下WebView里面的适配方案，因为微信，原生浏览器里面根本不用我们适配。

1. fixed头部
* 判断在ios并且处在app环境中的时候加一个特定的类名，比如：iphone-head-nav
* 给iphone-head-nav加一个padding-top值空出来顶部安全距离
```css
.iphone-head-nav {
  padding-top: 20px; // iphonex系列机型之前顶部安全距离均为20px
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
```

2. fixed底部(一般都是吸底按钮)
因为在iphonex上，按钮bottom为底部安全距离，那和最下面就会有一段镂空的空档，所以还需要把这个空档给补上。
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

## 实际情况
我所在的客户端团队，H5页面顶部直接被限定在安全距离内，底部是会被小黑条挡住的。(这种发方式最保守)
* 这种情况只需要把body底部留一个30px的padding即可(设计稿一般都会有留底的)。
* 如果有吸底按钮的只需要保证按钮高度胖一点即可，不用做特殊处理

## 总结
所谓的刘海屏适配，本质就是给元素添加env函数获取到的长度，让元素不被刘海或者小黑条挡住