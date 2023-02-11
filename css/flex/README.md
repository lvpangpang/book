# Flex

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

## 1 父容器属性

1. flex-direction
   决定主轴的方向

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

2. flex-wrap
   默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap 属性定义，如果一条轴线排不下，如何换行。

```css
.box {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

3. flex-flow
   flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

4. justify-content
   定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

5. align-items
   定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- align-content
  属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

## 2 子元素的属性

1. order
   义项目的排列顺序。数值越小，排列越靠前，默认为 0。

2. flex-grow
   定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

3. flex-shrink
   定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

4. flex-basis
   定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小，即减掉项目本身大小后再平均分

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

5. flex
   flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ < 'flex-grow' > < 'flex-shrink' >? || < 'flex-basis' > ];
}
```

flex: 0 1 auto (默认) 存在剩余空间 不放大
flex: 1 (1 1 0%)，存在剩余空间则放大撑满整个空间
参考闪电打车小程序城市地址输入框的处理，左边的城市长度会变化，所以要设置右边的地址输入框 flex：1，让右边的输入框长度占据剩余空间
flex: auto (1 1 auto) 存在剩余空间则放大撑满整个空间（但是会考虑自身空间）
参考网站导航栏，字数多的会胖一点

flex:1 和 flex:auto 的区别：
两者的区别是 flex-basis 属性
如果是多个元素都设置 flex 属性
flex:1 剩余空间完全均分，忽略自身元素宽度,剩余100px空间，则2个元素各站50px。
flex:auto 剩余空间要先减掉自身元素宽度后均分，也就是之前占据大空间的最终也会大一点。
**剩余空间要完全等分使用 flex:1 ，如果你要根据内容宽度动态分配宽度则使用 flex:auto**

6. align-self
   允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
