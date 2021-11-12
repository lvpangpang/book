# Hooks

## 1. useState
```javascript
let state = [];
let hookIndex = 0;
function useState(init) {
  const currentIndex = hookIndex;
  state[currentIndex] = state[currentIndex] === undefined ? init : state[currentIndex];

  // 修改state的方法
  const setState = value => {
    state[currentIndex] = value;

    // 只要修改了state，我们就需要重新处理这个节点
    workInProgressRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }

    // 修改nextUnitOfWork指向workInProgressRoot，这样下次就会处理这个节点了
    nextUnitOfWork = workInProgressRoot;
    deletions = [];
  }

  hookIndex++;

  return [state[currentIndex], setState]
}
```
上面的代码虽然我们支持了多个useState，但是仍然只有一套全局变量，如果有多个函数组件，每个组件都来操作这个全局变量，那相互之间不就是污染了数据了吗？所以我们数据还不能都存在全局变量上面，而是应该存在每个fiber节点上，处理这个节点的时候再将状态放到全局变量用来通讯