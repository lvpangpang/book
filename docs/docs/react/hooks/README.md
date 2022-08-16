# Hooks

## 1. useState

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

const state = []
const setters = []
let stateIndex = 0

function createSetter(index) {
  return function (newState) {
    state[index] = newState
    render()
  }
}

function render() {
  stateIndex = 0 // 注意将 stateIndex 重置为0
  ReactDOM.render(<App />, document.querySelector('#root'))
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))
  const value = state[stateIndex]
  const setter = setters[stateIndex]
  stateIndex++
  return [value, setter]
}

const App = () => {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(6)
  return (
    <div>
      {count}
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点我
      </button>
      {count1}
      <button
        onClick={() => {
          setCount1(count1 + 1)
        }}
      >
        点我
      </button>
    </div>
  )
}

export default App
```

上面的代码虽然我们支持了多个 useState，但是仍然只有一套全局变量，如果有多个函数组件，每个组件都来操作这个全局变量，那相互之间不就是污染了数据了吗？所以我们数据还不能都存在全局变量上面，而是应该存在每个 fiber 节点上，处理这个节点的时候再将状态放到全局变量用来通讯

## 2. useEffect

```jsx
const allDeps = []
let effectCursor = 0
function useEffect(callback, deps) {
  if (!allDeps[effectCursor]) {
    allDeps[effectCursor] = deps
    ++effectCursor
    callback()
    return
  }

  const currentEffectScrsor = effectCursor
  const rawDeps = allDeps[currentEffectScrsor]
  const isChanged = rawDeps.some((dep, index) => {
    dep !== deps[index]
  })
  if (isChanged) {
    callback()
    allDeps[effectCursor] = deps
  }
  ++effectCursor
}

function render() {
  effectSursor = 0 // 注意将 effectCursor 重置为0
  ReactDOM.render(<App />, document.querySelector('#toot'))
}
```
