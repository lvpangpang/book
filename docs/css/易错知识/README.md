# 易错知识点

1. fixed定位失效
元素祖先的 transform 属性非 none 时，容器由视口改为该祖先。

2. 最少代码水平垂直居中
```css
div.parent{
  display:flex;
}
div.child{
  margin:auto;
}
```

3. 伪类和伪元素的区别
* 伪类-:first-child 权重和类选择器一样(10)
* 伪元素-::before 权重(1),比元素选择器都小

4. 百分比相对参考对象

* 父元素宽度
max-width、min-width、width、left、right、text-indent、padding、margin、grid-template-columns、grid-auto-columns、column-gap

* 父元素高度
max-height、min-height、height、top、bottom 
