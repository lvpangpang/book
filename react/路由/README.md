# 路由
个人理解，前端路由就是监听url变化，根据不同的pathname加载对应的js资源
路由的URL改变和页面的切换是2回事情
1. history： history 是整个 React-router 的核心，里面包括两种路由模式下改变路由的方法，和监听路由变化方法等。
2. react-router：既然有了 history 路由监听/改变的核心，那么需要调度组件负责派发这些路由的更新，也需要容器组件通过路由更新，来渲染视图。所以说 React-router 在 history 核心基础上，增加了 Router ，Switch ，Route 等组件来处理视图渲染。
3. react-router-dom： 在 react-router 基础上，增加了一些 UI 层面的拓展比如 Link ，NavLink 。以及两种模式的根部路由 BrowserRouter ，HashRouter 。
**实际开发中只需要安装react-router-dom即可**

## 1.路由原理
1. history模式
* 改变路由
history.pushState(state,title,path)
只能改变url，但是不能改变页面视图，需要**手动改变**
history.replaceState(state,title,path) 

* 监听路由
```javascript
window.addEventListener('popstate',function(e){
    /* 监听改变 */
})
```
用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。 popstate 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 history.back()、history.forward()、history.go()方法。
所以无法只监听这个事件来做到渲染不同的组件，需要在pushState后**手动执行**对应的渲染函数

2. hash模式
* 改变路由
windows.location.href

* 监听路由
```javascript
window.addEventListener('hashchange',function(e){
    /* 监听改变 */
})
```

## 2. History对象
1. listen()
执行 listeners.push(listener);
订阅事件，当history.push执行时候会执行订阅的事件
```javascript
props.history.listen(location => {
  if (this._isMounted) {
    this.setState({ location }); // 这一步很关键
  } else {
    this._pendingLocation = location;
  }
});
```

2. push()
调用api改变url
执行listener.call({location}) 执行订阅的事件
```javascript
  let history: BrowserHistory = {
    get action() {
      return action;
    },
    get location() {
      return location;
    },
    createHref,
    push,
    replace,
    go,
    back() {
      go(-1);
    },
    forward() {
      go(1);
    },
    listen(listener) {
      return listeners.push(listener);
    },
    block(blocker) {
      let unblock = blockers.push(blocker);

      if (blockers.length === 1) {
        window.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }

      return function () {
        unblock();

        // Remove the beforeunload listener so the document may
        // still be salvageable in the pagehide event.
        // See https://html.spec.whatwg.org/#unloading-documents
        if (!blockers.length) {
          window.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    }
  };

```

## 3. 核心组件

1. Router
The public API for putting history on context（源码介绍）
**Router是整个应用路由的传递者和派发更新者**
将从传入的history对象的location信息存入react的state里面，这样就和react建立了关系
每次路由变化（history.push（）方法改变路由） ->  push函数里面主要是调用api改变url以及执行call函数，也就是执行订阅的函数-> 触发顶层 Router 的history.listen事件 -> Router 进行 setState -> 向下传递 nextContext（context 中含有最新的 location）-> 下面的 Route 获取新的 nextContext 判断是否进行渲染。
```javascript
import React from "react";

import HistoryContext from "./HistoryContext.js";
import RouterContext from "./RouterContext.js";

/**
 * The public API for putting history on context.
 */
class Router extends React.Component {
  // 静态方法，检测当前路由是否匹配
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }

  constructor(props) {
    super(props);

    this.state = {
      location: props.history.location     // 将history的location挂载到state上
    };

    // 下面两个变量是防御性代码，防止根组件还没渲染location就变了
    // 如果location变化时，当前根组件还没渲染出来，就先记下他，等当前组件mount了再设置到state上
    this._isMounted = false;
    this._pendingLocation = null;

    // 通过history监听路由变化，变化的时候，改变state上的location
    this.unlisten = props.history.listen(location => {
      if (this._isMounted) {
        this.setState({ location }); // 这一步很关键
      } else {
        this._pendingLocation = location;
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({ location: this._pendingLocation });
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this._isMounted = false;
      this._pendingLocation = null;
    }
  }

  render() {
    // render的内容很简单，就是两个context
    // 一个是路由的相关属性，包括history和location等
    // 一个只包含history信息，同时将子组件通过children渲染出来
    return (
      <RouterContext.Provider
        
      >
        <HistoryContext.Provider
          children={this.props.children || null}
          value={this.props.history}
        />
      </RouterContext.Provider>
    );
  }
}

export default Router;
```

2. BrowserRouter（Router的语法糖）
对Router组件的调用，主要是传了history对象给Router
```javascript
import React from "react";
import { Router } from "react-router";
import { createBrowserHistory as createHistory } from "history";

class BrowserRouter extends React.Component {
  history = createHistory(this.props);
  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
```

3. Route
The public API for matching a single path and rendering.（源码介绍）
由于整个路由状态是用 context 传递的，所以 Route 可以通过 RouterContext.Consumer 来获取上一级传递来的路由进行路由匹配，如果匹配，渲染子代路由。并利用 context 逐层传递的特点，将自己的路由信息，向子代路由传递下去。这样也就能轻松实现了嵌套路由。
从源码中也可以看到使用的时候支持3种形式
children, component, render
```javascript
class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          invariant(context, "You should not use <Route> outside a <Router>");

          const location = this.props.location || context.location;
          const match = this.props.computedMatch
            ? this.props.computedMatch // <Switch> already computed the match for us
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match;

          const props = { ...context, location, match };

          let { children, component, render } = this.props;

          // Preact uses an empty array as children by
          // default, so use null if that's the case.
          if (Array.isArray(children) && children.length === 0) {
            children = null;
          }

          return (
            <RouterContext.Provider value={props}>
              {props.match
                ? children
                  ? typeof children === "function"
                    ? __DEV__
                      ? evalChildrenDev(children, props, this.props.path)
                      : children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? __DEV__
                  ? evalChildrenDev(children, props, this.props.path)
                  : children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

```

4. Switch
The public API for rendering the first <Route> that matches.（源码介绍）
通过匹配选出一个正确路由 Route 进行渲染

5. Link
在 Link 中通过 history 库的 push 调用了 HTML5 history 的 pushState，**但是这仅仅会让路由变化，其他什么都没有改变**。然后通过 Router 中的 listen，它会监听路由的变化，通过 context 更新 props 和 nextContext 让下层的 Route 去重新匹配，完成需要渲染部分的更新。
```javascript
class Link extends React.Component {
  static defaultProps = {
    replace: false
  };

  handleClick(event, context) {
    if (this.props.onClick) this.props.onClick(event);

    if (
      !event.defaultPrevented && // 阻止默认事件
      event.button === 0 && // 忽略除左击之外的所有内容
      !this.props.target && // 让浏览器处理“target=_blank”等。
      !isModifiedEvent(event) // 忽略带有修饰符键的单击
    ) {
      event.preventDefault();

      const method = this.props.replace
        ? context.history.replace
        : context.history.push;

      method(this.props.to);
    }
  }

  render() {
    const { innerRef, replace, to, ...props } = this.props;
    // eslint-disable-line no-unused-vars

    return (
      // 无处不在的context
      <RouterContext.Consumer>
        {context => {
          invariant(context, "You should not use <Link> outside a <Router>");

          const location =
            typeof to === "string"
              ? createLocation(to, null, null, context.location)
              : to;
          const href = location ? context.history.createHref(location) : "";

          return (
            <a
              {...props}
              onClick={event => this.handleClick(event, context)}
              href={href}
              ref={innerRef}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
```

## 4. Hooks
**react-router新增的hooks就是用React.useContext()来获取最新的history对象信息**
```javascript
import React from "react";
import invariant from "tiny-invariant";

import Context from "./RouterContext.js";
import HistoryContext from "./HistoryContext.js";
import matchPath from "./matchPath.js";

const useContext = React.useContext;

export function useHistory() {
  if (__DEV__) {
    invariant(
      typeof useContext === "function",
      "You must use React >= 16.8 in order to use useHistory()"
    );
  }

  return useContext(HistoryContext);
}

export function useLocation() {
  if (__DEV__) {
    invariant(
      typeof useContext === "function",
      "You must use React >= 16.8 in order to use useLocation()"
    );
  }

  return useContext(Context).location;
}

export function useParams() {
  if (__DEV__) {
    invariant(
      typeof useContext === "function",
      "You must use React >= 16.8 in order to use useParams()"
    );
  }

  const match = useContext(Context).match;
  return match ? match.params : {};
}

export function useRouteMatch(path) {
  if (__DEV__) {
    invariant(
      typeof useContext === "function",
      "You must use React >= 16.8 in order to use useRouteMatch()"
    );
  }

  const location = useLocation();
  const match = useContext(Context).match;

  return path ? matchPath(location.pathname, path) : match;
}

```

## 5. 路由鉴权

```javascript
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function Auth(props) {
  const { location, config } = props
  const { pathname } = location
  const isLogin = localStorage.getItem('token')
  const target = config.find((item) => item.path === pathname)
  const { auth } = target
  if (auth && !isLogin) {
    return <Redirect to="/login"></Redirect>
  }
  return <Route exact path={target['path']} component={target['component']} />
}
```