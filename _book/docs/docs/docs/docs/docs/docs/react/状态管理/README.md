# 状态管理

Redux： 首先 Redux 是一个应用状态管理 js 库，它本身和 React 是没有关系的，换句话说，Redux 可以应用于其他框架构建的前端应用，甚至也可以应用于 Vue 中。  
React-Redux：React-Redux 是连接 React 应用和 Redux 状态管理的桥梁。React-redux 主要专注两件事，一是如何向 React 应用中注入 redux 中的 Store ，二是如何根据 Store 的改变，把消息派发给应用中需要状态的每一个组件。

## 1. Redux

Redux 只是一个单纯状态管理库，没有任何界面相关的东西，一个发布订阅模式的经典运用

1. createStore

```javascript
function createStore(reducer) {
  let state // state记录所有状态
  let listeners = [] // 保存所有注册的回调

  function subscribe(callback) {
    listeners.push(callback) // subscribe就是将回调保存下来
  }

  // dispatch就是将所有的回调拿出来依次执行就行
  function dispatch(action) {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  // getState直接返回state
  function getState() {
    return state
  }

  // store包装一下前面的方法直接返回
  const store = {
    subscribe,
    dispatch,
    getState,
  }

  return store
}
```

2. combineReducers

```javascript
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
```

## 2. React-Redux

```javascript
const ReactReduxContext = React.createContext(null)
function Provider({ store, context, children }) {
  /* 利用useMemo，跟据store变化创建出一个contextValue 包含一个根元素订阅器和当前store  */
  const contextValue = useMemo(() => {
    /* 创建了一个根级 Subscription 订阅器 */
    const subscription = new Subscription(store)
    return {
      store,
      subscription,
    } /* store 改变创建新的contextValue */
  }, [store])
  useEffect(() => {
    const { subscription } = contextValue
    /* 触发trySubscribe方法执行，创建listens */
    subscription.trySubscribe() // 发起订阅
    return () => {
      subscription.tryUnsubscribe() // 卸载订阅
    }
  }, [contextValue]) /*  contextValue state 改变出发新的 effect */
  const Context = ReactReduxContext
  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
```

