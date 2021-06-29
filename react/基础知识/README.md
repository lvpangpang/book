## 基础知识

1. createContext

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
```javascript
const Const = React.createContext();
```
Context 对象 中有三个 关键属性，他们依次为 _currentValue、Provider、Consumer。
* 在子组件中使用的 context 值，都是从 Context._currentValue 获取的。
* Context.Provider，react 组件，用于更新 Context._currentValue 并通知使用 Context 对象 的 子组件 更新。
* Context.Consumer，react 组件，用于将 Context._currentValue 传递给 子组件 并 订阅 Context._currentValue 的变化。