# 状态管理
## Redux
Redux只是一个单纯状态管理库，没有任何界面相关的东西
Redux是一个发布订阅模式的经典运用
1. createStore
```javascript
function createStore(reducer) {
  let state;              // state记录所有状态
  let listeners = [];     // 保存所有注册的回调

  function subscribe(callback) {
    listeners.push(callback);       // subscribe就是将回调保存下来
  }

  // dispatch就是将所有的回调拿出来依次执行就行
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  // getState直接返回state
  function getState() {
    return state;
  }

  // store包装一下前面的方法直接返回
  const store = {
    subscribe,
    dispatch,
    getState
  }

  return store;
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

## React-Redux
```javascript
import React from 'react';
import ReactReduxContext from './Context';

function Provider(props) {
  const {store, children} = props;

  // 这是要传递的context
  const contextValue = { store };

  // 返回ReactReduxContext包裹的组件，传入contextValue
  // 里面的内容就直接是children，我们不动他
  return (
    <ReactReduxContext.Provider value={contextValue}>
      {children}
    </ReactReduxContext.Provider>
  )
}
```