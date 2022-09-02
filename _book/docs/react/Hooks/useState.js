import React from 'react'
import ReactDOM from 'react-dom'

const state = []
const setters = []
let stateIndex = 0

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))
  const value = state[stateIndex]
  const setter = setters[stateIndex]
  stateIndex++
  return [value, setter]
}

function createSetter(index) {
  return function (newState) {
    state[index] = newState
    render()
  }
}

function render() {
  stateIndex = 0
  ReactDOM.render(<App />, document.querySelector('#root'))
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
