# 路由
个人理解，前端路由就是监听url变化，根据不同的pathname加载对应的js资源
路由的跳转和页面的切换是2回事情
* history提供了核心api，如监听路由，更改路由的方法，已经保存路由状态state。
* react-router提供路由渲染组件，路由唯一性匹配组件，重定向组件等功能组件

## 1.路由原理
1. history模式
* 改变路由
history.pushState(state,title,path)
只能改变url，但是不能改变页面视图，需要手动改变
history.replaceState(state,title,path) 

* 监听路由
popstate
这个api只能监听到浏览器自带的前进回退按钮，所以无法只监听这个事件来做到渲染不同的组件，需要在pushState后手动执行对应的渲染函数

2. hash模式
* 改变路由
windows.location.href

* 监听路由
hashchange

## 2. 核心组件

1. BrowserRouter
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

2. Router
将从传入的history对象的location信息存入react的state里面，这样就和react建立了关系
每次路由变化 -> 触发顶层 Router 的回调事件 -> Router 进行 setState -> 向下传递 nextContext（context 中含有最新的 location）-> 下面的 Route 获取新的 nextContext 判断是否进行渲染。
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

3. history(这个是对象)
* createTransitionManager
发布订阅模式

4. Route
找到location和<router>的path匹配的组件并渲染。
5. Switch

6. Link
在 Link 中通过 history 库的 push 调用了 HTML5 history 的 pushState，但是这仅仅会让路由变化，其他什么都没有改变。然后通过 Router 中的 listen，它会监听路由的变化，通过 context 更新 props 和 nextContext 让下层的 Route 去重新匹配，完成需要渲染部分的更新。
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

## 3. 路由鉴权

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
