## Flex
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

### 容器属性
+ flex-direction
+ flex-wrap
+ flex-flow
+ justify-content
+ align-items
+ align-content

### 项目的属性
+ order
+ flex-grow
定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
+ flex-shrink
定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
+ flex-basis
定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
+ flex
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
auto (1 1 auto) 和 none (0 0 auto)。
+ align-self
