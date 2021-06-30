## 虚拟DOM
1. React.createElement(type, [props], [...children])，将JSX转化为react元素。
> babel在编译时会判断JSX中组件的首字母，当首字母为小写时，其被认定为原生DOM标签，createElement的第一个变量被编译为字符串；当首字母为大写时，其被认定为自定义组件，createElement的第一个变量被编译为对象；这就是为什么写组件时候需要大写组件首字母。

2. React组件的渲染流程
> 1. 使用React.createElement或JSX编写React组件，实际上所有的JSX代码最后都会转换成React.createElement(...)，Babel帮助我们完成了这个转换的过程。
> 2. createElement函数对key和ref等特殊的props进行处理，并获取defaultProps对默认props进行赋值，并且对传入的孩子节点进行处理，最终构造成一个ReactElement对象（所谓的虚拟DOM）。
> 3. ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM。

3. 虚拟DOM的组成-即ReactElementelement对象，我们的组件最终会被渲染成下面的结构：
> 1. type：元素的类型，可以是原生html类型（字符串），或者自定义组件（函数或class）
> 2. key：组件的唯一标识，用于Diff算法，下面会详细介绍
> 3. ref：用于访问原生dom节点
> 4. props：传入组件的props，chidren是props中的一个属性，它存储了当前组件的孩子节点，可以是数组（多个孩子节点）或对象（只有一个孩子节点）
> 5. owner：当前正在构建的Component所属的Component
> 6. self：（非生产环境）指定当前位于哪个组件实例
> 7. _source：（非生产环境）指定调试代码来自的文件(fileName)和代码行数(lineNumber)

4. 防止XSS
> ReactElement对象还有一个?typeof属性，它是一个Symbol类型的变量Symbol.for('react.element')，当环境不支持Symbol时，?typeof被赋值为0xeac7。
> 这个变量可以防止XSS。如果你的服务器有一个漏洞，允许用户存储任意JSON对象， 而客户端代码需要一个字符串，这可能为你的应用程序带来风险。JSON中不能存储Symbol类型的变量，而React渲染时会把没有?typeof标识的组件过滤掉。
