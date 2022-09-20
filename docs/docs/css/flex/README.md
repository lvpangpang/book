# Flex
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

## 父容器属性
+ flex-direction
+ flex-wrap
+ flex-flow
+ justify-content
+ align-items
+ align-content

## 子元素的属性
+ order

+ flex-grow
定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

+ flex-shrink
定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

+ flex-basis
定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

+ flex
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
flex: 0 1 auto (默认)
flex: none (0 0 auto) （常用）
flex: 1 (1 1 0%)，尺寸不足时会优先最小化内容尺寸（常用）
参考闪电打车小程序城市地址输入框的处理，左边的城市长度会变化，所以要设置右边的地址输入框flex：1，让右边的输入框长度占据剩余空间
flex: auto (1 1 auto) 尺寸不足时会优先最大化内容尺寸

+ align-self
