# 易错知识点

1. fixed 定位失效
   元素祖先的 transform 属性非 none 时，容器由视口改为该祖先。

2. 最少代码水平垂直居中

```css
div.parent {
  display: flex;
}
div.child {
  margin: auto;
}
```

3. 伪类和伪元素的区别

- 伪类-:first-child 权重和类选择器一样(10)
- 伪元素-::before 权重(1),比元素选择器都小

4. 百分比相对参考对象

- 父元素宽度
  max-width、min-width、width、left、right、text-indent、padding、margin、grid-template-columns、grid-auto-columns、column-gap

- 父元素高度
  max-height、min-height、height、top、bottom


5. 物理像素和逻辑像素
   物理像素代表屏幕上有多少个点，比如买的联想小新Pro-2560x1600表示屏幕水平方向一排有2560个物理像素点。
   逻辑像素表示屏幕展示物体的视觉尺寸是多少。逻辑像素相同表示物体看起来或者打印出来大小一样，物理像素点越小，一个逻辑像素包含点物理像素点就越多，看起来就越清晰
   CSS像素=逻辑像素（页面不缩放）
   CSS像素=2个逻辑像素（页面放大100%）
