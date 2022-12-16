# 路由

1. history 库： 提供了核心 api，如监听路由，更改路由的方法，已经保存路由状态 state
2. react-router 库：在 history 核心基础上，增加了 Router ，Switch ，Route 等组件来处理视图渲染。
3. react-router-dom 库： 在 react-router 基础上，增加了一些 UI 层面的拓展比如 Link ，NavLink 。

实际开发中只需要安装 react-router-dom 即可

## 1.路由原理

1. history 模式

- 改变路由

```js
history.pushState(state, title, path)
history.replaceState(state, title, path)
```

- 监听路由

```js
window.addEventListener('popstate', function (e) {
  /* 监听改变 */
})
```

用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。 popstate 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 history.back()、history.forward()、history.go()方法。
**所以无法只监听这个事件来做到渲染不同的组件，需要在 pushState 后手动执行对应的渲染函数**

2. hash 模式

- 改变路由
  windows.location.href

- 监听路由

```js
window.addEventListener('hashchange', function (e) {
  /* 监听改变 */
})
```

## 2. History 对象

观察者模式的典型例子

1. listen()

```js
function listen(listener) {
  const unlisten = transitionManager.appendListener(listener)
  checkDOMListeners(1)

  return () => {
    checkDOMListeners(-1)
    unlisten()
  }
}
```

2. push()

- 调用 window.history.pushState() 改变 url
- 触发 history 下面的 setState 方法，产生了一个 location 对象, 并且通知监听者

```js
function push(path, state) {
  const action = 'PUSH'
  const location = createLocation(path, state, createKey(), history.location)

  transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
    if (!ok) return

    const href = createHref(location)
    const { key, state } = location

    if (canUseHistory) {
      if (forceRefresh) {
        window.location.href = href
      } else {
        globalHistory.pushState({ key, state }, null, href) // 改变url
        const prevIndex = allKeys.indexOf(history.location.key)
        const nextKeys = allKeys.slice(0, prevIndex + 1)

        nextKeys.push(location.key)
        allKeys = nextKeys

        setState({ action, location }) // 生成新的location对象
      }
    } else {
      window.location.href = href
    }
  })
}

function setState(nextState) {
  Object.assign(history, nextState) // 合并最新的路由信息
  history.length = globalHistory.length
  transitionManager.notifyListeners(history.location, history.action) // 通知监听者，并将最新的location对象传过去
}
```

- Router 组件通过初始化时候调用 history.listen 监听，感知到 location 参数的改变，然后通过 Context 将最新的路由信息传递到下面的 Route 组件匹配渲染对应的组件

```js
// 通过history.listen方法订阅history对象的location变化，从而改变state上的location
this.unlisten = props.history.listen((location) => {
  if (this._isMounted) {
    this.setState({ location }) // 获取最新的location对象
  } else {
    this._pendingLocation = location
  }
})
```

## 3. 核心组件

1. Router
   The public API for putting history on context（源码介绍）
   **Router 是整个应用路由的传递者和派发更新者**

```js
import React from 'react'

import HistoryContext from './HistoryContext.js'
import RouterContext from './RouterContext.js'

/**
 * The public API for putting history on context.
 */
class Router extends React.Component {
  static computeRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
  }

  constructor(props) {
    super(props)

    this.state = {
      location: props.history.location,
    }

    this._isMounted = false
    this._pendingLocation = null

    if (!props.staticContext) {
      this.unlisten = props.history.listen((location) => {
        this._pendingLocation = location
      })
    }
  }

  componentDidMount() {
    this._isMounted = true

    if (this.unlisten) {
      // Any pre-mount location changes have been captured at
      // this point, so unregister the listener.
      this.unlisten()
    }
    if (!this.props.staticContext) {
      this.unlisten = this.props.history.listen((location) => {
        if (this._isMounted) {
          this.setState({ location })
        }
      })
    }
    if (this._pendingLocation) {
      this.setState({ location: this._pendingLocation })
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
      this._isMounted = false
      this._pendingLocation = null
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
          staticContext: this.props.staticContext,
        }}
      >
        <HistoryContext.Provider
          children={this.props.children || null}
          value={this.props.history}
        />
      </RouterContext.Provider>
    )
  }
}
```

2. BrowserRouter（Router 的语法糖）
   对 Router 组件的调用，主要是传了 history 对象给 Router

```js
import React from 'react'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

class BrowserRouter extends React.Component {
  history = createBrowserHistory(this.props)
  render() {
    return <Router history={this.history} children={this.props.children} />
  }
}
```

3. Route
   The public API for matching a single path and rendering.（源码介绍）
   由于整个路由状态是用 context 传递的，所以 Route 可以通过 RouterContext.Consumer 来获取上一级传递来的路由进行路由匹配，如果匹配，渲染子代路由。并利用 context 逐层传递的特点，将自己的路由信息，向子代路由传递下去。这样也就能轻松实现了嵌套路由。
   从源码中也可以看到使用的时候支持 3 种形式
   children > component > render

```js
class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, 'You should not use <Route> outside a <Router>')

          const location = this.props.location || context.location
          const match = this.props.computedMatch
            ? this.props.computedMatch // <Switch> already computed the match for us
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match

          const props = { ...context, location, match }

          let { children, component, render } = this.props

          // Preact uses an empty array as children by
          // default, so use null if that's the case.
          if (Array.isArray(children) && children.length === 0) {
            children = null
          }

          return (
            <RouterContext.Provider value={props}>
              {props.match
                ? children
                  ? typeof children === 'function'
                    ? __DEV__
                      ? evalChildrenDev(children, props, this.props.path)
                      : children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === 'function'
                ? __DEV__
                  ? evalChildrenDev(children, props, this.props.path)
                  : children(props)
                : null}
            </RouterContext.Provider>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}
```

## 4.总结

1. Router 组件定义了 state.location 变量来存储最新的路由信息，然后通过 history.listen 来获取最新的路由对象，用 Context 来包装 Children，往下传递 history，location 等对象
2. history.push() 函数里面主要是调用 pushState() 改变 url 然后调用 setState()方式，setState 方法合并生成最新的 location 对象并且执行订阅的函数（通过 history.listen 订阅）
3. Router 组件 的 history.listen 订阅的函数被执行，获取到最新的 location 对象，更新 state.location 对象
4. 向下传递 最新的 location 对象， 下面的 Route 获取新的 location 对象 判断渲染那个路由组件

React-Router 就是发布订阅模式+React.Context 的组合运用
