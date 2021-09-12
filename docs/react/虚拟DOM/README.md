# 虚拟 DOM

## 实例
下面是实际的dom结构
```html
<div class="title">
  <span>Hello ConardLi</span>
  <ul>
    <li>苹果</li>
    <li>橘子</li>
  </ul>
</div>
```

会被React转为下面的虚拟Dom
```javascript
const VitrualDom = {
  type: 'div',
  props: { class: 'title' },
  children: [
    {
      type: 'span',
      children: 'Hello ConardLi'
    },
    {
      type: 'ul',
      children: [
        { type: 'ul', children: '苹果' },
        { type: 'ul', children: '橘子' }
      ]
    }
  ]
}
```
## React.creatElement
1. React.createElement(type, [props], [...children])，将 JSX 转化为 react 元素。
```javascript
function createElement(type, props, ...children) {
  // 核心逻辑不复杂，将参数都塞到一个对象上返回就行
  // children也要放到props里面去，这样我们在组件里面就能通过this.props.children拿到子元素
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}
```

2. 虚拟 DOM 的组成-即 ReactElementelement 对象，我们的组件最终会被渲染成下面的结构：
* type：元素的类型，可以是原生 html 类型（字符串），或者自定义组件（函数或 class）
* key：组件的唯一标识，用于 Diff 算法，下面会详细介绍
* ref：用于访问原生 dom 节点
* props：传入组件的 props，chidren 是 props 中的一个属性，它存储了当前组件的孩子节点，可以是数组（多个孩子节点）或对象（只有一个孩子节点）
* owner：当前正在构建的 Component 所属的 Component
* self：（非生产环境）指定当前位于哪个组件实例
* _source：（非生产环境）指定调试代码来自的文件(fileName)和代码行数(lineNumber)

babel 在编译时会判断 JSX 中组件的首字母，当首字母为小写时，其被认定为原生 DOM 标签，createElement 的第一个变量被编译为字符串；当首字母为大写时，其被认定为自定义组件，createElement 的第一个变量被编译为对象；这就是为什么写组件时候需要大写组件首字母。

## ReactDom.render()
示例代码
```html
<div>
  <img src="avatar.png" className="profile" />
  <Hello />
</div>;
```
```javascript
React.createElement("div", null, React.createElement("img", {
  src: "avatar.png",
  className: "profile"
}), React.createElement(Hello, null));
```
1. 使用 React.createElement 或 JSX 编写 React 组件，实际上所有的 JSX 代码最后都会转换成 React.createElement(...)，Babel 帮助我们完成了这个转换的过程。
2. createElement 函数对 key 和 ref 等特殊的 props 进行处理，并获取 defaultProps 对默认 props 进行赋值，并且对传入的孩子节点进行处理，最终构造成一个 ReactElement 对象（所谓的虚拟 DOM）。
3. ReactDOM.render 将生成好的虚拟 DOM 渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实 DOM。

```javascript
function render(vDom, container) {
  let dom
  // 检查当前节点是文本还是对象
  if (typeof vDom !== 'object') {
    dom = document.createTextNode(vDom)
  } else {
    dom = document.createElement(vDom.type)
  }

  // 将vDom上除了children外的属性都挂载到真正的DOM上去
  if (vDom.props) {
    Object.keys(vDom.props)
      .forEach((item) => {
        dom.setAttribute(item, vDom.props[item])
      })
  }

  // 如果还有子元素，递归调用
  if (vDom.props?.children?.length) {
    vDom.props.children.forEach((child) => render(child, dom))
  }

  container.appendChild(dom)
}
```