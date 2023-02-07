# 高阶组件

高阶组件是参数为组件，返回值为新组件的函数。

## 1. withRouter-增强props

```javascript
function withRouter(Component) {
  const displayName = `withRouter(${Component.displayName || Component.name})`
  const C = (props) => {
    const { wrapedComponentRef, ...remainingProps } = props
    return(
      <RouterContext.Consumer>{
        (context) => {
          return (
            <Component
              {...remainingProps} // 组件元素的props
              {...context} // 存在路由对象的上下文，history等对象，这样新组件就能获取到history对象
              ref={wrappedComponentRef}
            >
          )
        }
      }</RouterContext.Consumer>
    )
  }
  C.displayName = displayName
  C.WrappedComponent = Component
}
```

## 2. 动态加载

```javascript
function dynamicLoad(loadRouter) {
  return class Context extends React.Component {
    state = { Component: null }
    componentDidMount() {
      if (this.state.Component) return
      loadRouter()
        .then((module) => module.default)
        .then((Component) => this.setState({ Component }))
    }

    render() {
      const { Component } = this.state
      return Component ? <Component {...this.props} /> : <Loading />
    }
  }
}
```
