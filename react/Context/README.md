# Context
这个东西很牛逼， react-router，react-redux里面都用到了

## 1. createContext

1. Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
```javascript
const Const = React.createContext();
```

2. Context 对象 中有三个 关键属性，他们依次为 _currentValue、Provider、Consumer。
* 在子组件中使用的 context 值，都是从 Context._currentValue 获取的。
* Context.Provider，react 组件，用于更新 Context._currentValue 并通知使用 Context 对象 的 子组件 更新。
* Context.Consumer，react 组件，用于将 Context._currentValue 传递给 子组件 并 订阅 Context._currentValue 的变化。

## 2. 提供者
```javascript
<Context.Provider value={value}>
  <Child />
</Context.Provider>
```

## 3. 消费者

1. 类组件使用静态属性contextType
通过给 类组件 定义一个 静态属性 - contextType
```javascript
import Context from './context.js'
class Child extends React.Component {
  static contextType = Context
  render() {
      return <div>{this.context}</div>
  }
}
```

2. 函数组件使用 useContext
```javascript
import Context1 from './context1.js'
import Context2 from './context2.js'
function Child(props) {
  const context1 = React.useContext(Context1)
  const context2 = React.useContext(Context2)
  return ...
}
```

3. Context.Consumer 
```javascript
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

