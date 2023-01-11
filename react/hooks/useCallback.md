# useCallback

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

返回一个 memoized 回调函数，保证引用相等

**使用 useCallback 是为了让子组件获取到相同的函数，而不是优化组件本身**

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

不使用 useCallback，每次 A 组件执行的时候，cb 函数都会被赋值一个新函数，子组件获取到的 cb 永远是变化的（其实人家根本没变）

```js
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ReactDOM from 'react-dom/client'

function A() {
  const [val, setVal] = useState(0)

  const cb = useCallback(() => {
    console.log('useCallback')
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          setVal((preState) => ++preState)
        }}
      >
        吕肥肥
      </button>
      <p>{val}</p>
      <B cb={cb}></B>
    </div>
  )
}

function B(props) {
  const { cb } = props
  useEffect(() => {
    console.log('更新了')
  }, [cb])
  console.log('组件B被执行了')
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<A></A>)
```
