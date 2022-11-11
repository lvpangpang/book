# 虚拟 DOM

虚拟 DOM 本质就是 js 对象，一个保存 DOM 信息的对象。  
react 以及 react-native 中都用到了，用来抹平各平台差异

## 1.实例

1. 下面是实际的 dom 结构

```html
<div class="title">
  <span>吕肥肥</span>
  <ul>
    <li>苹果</li>
    <li>橘子</li>
  </ul>
</div>
```

2. 会被 React 转为下面的虚拟 DOM

```js
const VitrualDom = {
  type: 'div',
  props: { class: 'title' },
  children: [
    {
      type: 'span',
      null,
      children: 'Hello ConardLi'
    },
    {
      type: 'ul',
      null,
      children: [
        { type: 'ul', null, children: '苹果' },
        { type: 'ul', null, children: '橘子' }
      ]
    }
  ]
}
```

## 2. ReactElement对象

- type：元素的类型，可以是原生 html 类型（字符串），或者自定义组件（函数或 class）
- key：组件的唯一标识，用于 Diff 算法
- ref：用于访问原生 dom 节点
- self：（非生产环境）指定当前位于哪个组件实例
- source：（非生产环境）指定调试代码来自的文件(fileName)和代码行数(lineNumber)
- owner：当前正在构建的 Component 所属的 Component
- props：传入组件的 props，chidren 是 props 中的一个属性，它存储了当前组件的孩子节点，可以是数组（多个孩子节点）或对象（只有一个孩子节点）

```js
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  }
  return element
}
```

## 3.React.creatElement()

```javascript
export function createElement(type, config, children) {
  let propName
  const props = {}
  let key = null
  let ref = null
  let self = null
  let source = null

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref
    }
    if (hasValidKey(config)) {
      key = '' + config.key
    }

    self = config.__self === undefined ? null : config.__self
    source = config.__source === undefined ? null : config.__source

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName]
      }
    }
  }

  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    props.children = childArray
  }

  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}
```
## 4. 流程总结

1. 使用 React.createElement()或 JSX 编写 React 组件，实际上所有的 JSX 代码最后都会转换成 React.createElement(...)，Babel 帮助我们完成了这个转换的过程。

2. createElement 函数对 key 和 ref 等特殊的 props 进行处理，并获取 defaultProps 对默认 props 进行赋值，并且对传入的孩子节点进行处理，最终构造成一个 ReactElement 对象（所谓的虚拟 DOM）。

3. ReactDOM.render 将生成好的虚拟 DOM 渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实 DOM。
