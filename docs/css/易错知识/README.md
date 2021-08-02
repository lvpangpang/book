## 易错知识点

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