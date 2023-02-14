# 移动端适配

html 页面注入下面这段 js，设计稿以 750px 为准

```js
;(function (doc, win) {
  var docEle = doc.documentElement,
    evt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
    fn = function () {
      var width = docEle.clientWidth
      width = width < 320 ? 320 : width
      width = width > 640 ? 640 : width
      width && (docEle.style.fontSize = 100 * (width / 750) + 'px')
    }
  win.addEventListener(evt, fn, false)
  doc.addEventListener('DOMContentLoaded', fn, false)
})(document, window)
```

1. 配合 vscode 的插件，设置 100px 为基准 font-Size，写 px 会被 vscode 转化为 rem
2. 配合 webpack 的插件 px2rem-loader，设计稿是多少 px 写多少 px 即可
