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

## 3 useRef 源码

在这个阶段， useRef 和其他 Hook ⼀样创建⼀个 Hook 对象，然后创建⼀个 {current: initialValue} 的值，缓存到 Hook 的 memoizedState 属性，并返回该值

1. Mount 阶段

```js
function mountRef<T>(initialValue: T): {| current: T |} {
  const hook = mountWorkInProgressHook()

  if (enableUseRefAccessWarning) {
    if (__DEV__) {
      //...
    } else {
      const ref = { current: initialValue }
      hook.memoizedState = ref
      return ref
    }
  } else {
    const ref = { current: initialValue }
    hook.memoizedState = ref
    return ref
  }
}
```

2. Update 阶段
   ```js
   function updateRef<T>(initialValue: T): {| current: T |} {
     const hook = updateWorkInProgressHook()
     return hook.memoizedState
   }
   ```

## 4 ref 属性

1. 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
2. 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
3. 默认情况，你不能在函数组件上使用 ref 属性，因为他们没有实例。但是你可以通过 forwardRef + useImperativeHandle 对外暴露属性和方法
