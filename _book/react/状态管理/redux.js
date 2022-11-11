function createStore(reducer) {
  let state
  let listeners = []

  function subscribe(callback) {
    listeners.push(callback)
  }

  function dispatch(action) {
    state = reducer(state, action)
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()
    }
  }

  function getState() {
    return state
  }

  return {
    subscribe,
    dispatch,
    getState,
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const reducer = function (state = {}, action) {
    const newState = {}
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i]
      let curReducer = reducers[key]
      let preState = state[key]
      console.log(preState)
      newState[key] = curReducer(preState, action)
    }
    return newState
  }
  return reducer
}

const initMilkState = {
  milk: 0,
}
function milkReducer(state = initMilkState, action) {
  switch (action.type) {
    case 'PUT_MILK':
      return { ...state, milk: state.milk + action.count }
    case 'TAKE_MILK':
      return { ...state, milk: state.milk - action.count }
    default:
      return state
  }
}

const initRiceState = {
  rice: 0,
}
function riceReducer(state = initRiceState, action) {
  switch (action.type) {
    case 'PUT_RICE':
      return { ...state, rice: state.rice + action.count }
    case 'TAKE_RICE':
      return { ...state, rice: state.rice - action.count }
    default:
      return state
  }
}

const reducer = combineReducers({ milkState: milkReducer, riceState: riceReducer })
let store = createStore(reducer)

// subscribe其实就是订阅store的变化，一旦store发生了变化，传入的回调函数就会被调用
// 如果是结合页面更新，更新的操作就是在这里执行
store.subscribe(() => {
  // console.log(store.getState())
})

// 将action发出去要用dispatch
store.dispatch({ type: 'PUT_MILK', count: 1 }) // milk: 1
store.dispatch({ type: 'PUT_MILK', count: 2 }) // milk: 3
store.dispatch({ type: 'TAKE_MILK', count: 1 }) // milk: 1

store.dispatch({ type: 'PUT_RICE', count: 1 });    // rice: 1
store.dispatch({ type: 'PUT_RICE', count: 1 });    // rice: 2
store.dispatch({ type: 'TAKE_RICE', count: 1 });   // rice: 1
