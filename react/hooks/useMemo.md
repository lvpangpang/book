# useMemo

**使用 useMemo 是为了让子组件获取到相同的值，而不是优化组件本身**

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

返回一个 memoized 值，避免昂贵的计算

不使用useMemo, 每次A组件执行，都会给value赋值一个新地址的数组，子组件获取到的value永远是变化的（其实人家根本没变）

```js
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ReactDOM from 'react-dom/client'

function A() {
  const [val, setVal] = useState(0)

  // 一开始就会执行一次
  const value = useMemo(() => {
    console.log('useMemo被执行了')
    return [1, 2, 3]
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
      <B value={value}></B>
    </div>
  )
}

function B(props) {
  const { value } = props
  useEffect(() => {
    console.log('更新了')
  }, [value])
  console.log('组件B被执行了')
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<A></A>)
```
