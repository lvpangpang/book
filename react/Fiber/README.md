# Fiber

1. fiber 是一种特定数据结构。
2. fiber 使用父子关系以及 next 的妙用，以链表形式模拟了传统调用栈。
3. fiber 是一种调度让出机制，只在有剩余时间的情况下运行。React 通过 MessageChannel + requestAnimationFrame 自己模拟实现了 requestIdleCallback。

```js
const process = (deadline) => {
  // 通过deadline.timeRemaining可获取剩余时间
  console.log('deadline', deadline.timeRemaining())
}
window.requestIdleCallback(process)
```

4. fiber 实现了增量渲染，在浏览器允许的情况下一点点拼凑出最终渲染效果。
5. fiber 实现了并发，为任务赋予不同优先级，保证了一有时间总是做最高优先级的事，而不是先来先占位死板的去执行。
6. fiber 有协调与提交两个阶段，协调包含了 fiber 创建与 diff 更新，此过程可暂停。而提交必须同步执行，保证渲染不卡顿。

## 2. Fiber 结构

```js
// packages/react-reconciler/src/ReactInternalTypes.js
export type Fiber = {
  // 1. 作为静态数据结构，存储节点 dom 相关信息
  tag: WorkTag, // 组件的类型，取决于 react 的元素类型，比如类组件，函数组件等
  key: null | string,
  elementType: any, // 元素类型
  type: any, // 定义与此fiber关联的功能或类。对于组件，它指向构造函数；对于DOM元素，它指定HTML tag
  stateNode: any, // 真实 dom 节点

  // 2. fiber 链表树相关
  return: Fiber | null, // 父 fiber
  child: Fiber | null, // 第一个子 fiber
  sibling: Fiber | null, // 下一个兄弟 fiber
  index: number, // 在父 fiber 下面的子 fiber 中的下标

  ref: null | (((handle: mixed) => void) & { _stringRef: ?string, ... }) | RefObject,

  // 3. 数据单元，用于计算 state 和 props 渲染
  pendingProps: any, // 本次渲染需要使用的 props
  memoizedProps: any, // 上次渲染使用的 props
  memoizedState: any, // 上次渲染后的 state 状态（函数组件的更新队列在 memoizedState.queue 中, useRef数据存在memoizedState.ref中）
  updateQueue: mixed, // 类组件用于状态更新、回调函数、DOM更新的队列
  dependencies: Dependencies | null, // contexts、events 等依赖

  mode: TypeOfMode,

  // 4. 副作用相关
  flags: Flags, // 记录更新时当前 fiber 的副作用(删除、更新、替换等)状态
  subtreeFlags: Flags, // 当前子树的副作用状态
  deletions: Array<Fiber> | null, // 要删除的子 fiber
  nextEffect: Fiber | null, // 下一个有副作用的 fiber
  firstEffect: Fiber | null, // 指向第一个有副作用的 fiber
  lastEffect: Fiber | null, // 指向最后一个有副作用的 fiber

  // 优先级相关
  lanes: Lanes,

  // current树和workInProgress树的桥梁
  alternate: Fiber | null, // workInProgress 树
}
```
