# useRef

## 1 createRef

React.createRef 创建一个能够通过 ref 属性附加到 React 元素的 ref

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
  }

  render() {
    return <input type="text" ref={this.inputRef} />
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }
}
```
可以在类组件以及函数组件中使用

## 2 useRef

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```
1. 只能在函数组件中使用
2. 它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式