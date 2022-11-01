# Fiber

异步可中断的更新需要一定的数据结构在内存中来保存工作单元的信息，这个数据结构就是 Fiber。

## 1 Fiber 作用

react 通过 fiber，为我们提供了一种跟踪、调度、暂停和中止工作的便捷方式，保证了页面的性能和流畅度。

1. 工作单元 ：Fiber 最重要的功能就是作为工作单元，保存原生节点或者组件节点对应信息（包括优先级），这些节点通过指针的形似形成 Fiber 树
2. 增量渲染：通过 jsx 对象和 current Fiber 的对比，生成最小的差异补丁，应用到真实节点上
3. 根据优先级暂停、继续、排列优先级：Fiber 节点上保存了优先级，能通过不同节点优先级的对比，达到任务的暂停、继续、排列优先级等能力，也为上层实现批量更新、Suspense 提供了基础
4. 保存状态：因为 Fiber 能保存状态和更新的信息，所以就能实现函数组件的状态更新，也就是 hooks

## 2. Fiber结构

```js
// packages/react-reconciler/src/ReactInternalTypes.js
export type Fiber = {
  // 作为静态数据结构，存储节点 dom 相关信息
  tag: WorkTag, // 组件的类型，取决于 react 的元素类型
  key: null | string,
  elementType: any, // 元素类型
  type: any, // 定义与此fiber关联的功能或类。对于组件，它指向构造函数；对于DOM元素，它指定HTML tag
  stateNode: any, // 真实 dom 节点
  
  // fiber 链表树相关
  return: Fiber | null, // 父 fiber
  child: Fiber | null, // 第一个子 fiber
  sibling: Fiber | null, // 下一个兄弟 fiber
  index: number, // 在父 fiber 下面的子 fiber 中的下标
  
  ref:
    | null
    | (((handle: mixed) => void) & {_stringRef: ?string, ...})
    | RefObject,
    
  // 工作单元，用于计算 state 和 props 渲染
  pendingProps: any, // 本次渲染需要使用的 props
  memoizedProps: any, // 上次渲染使用的 props
  updateQueue: mixed, // 用于状态更新、回调函数、DOM更新的队列
  memoizedState: any, // 上次渲染后的 state 状态
  dependencies: Dependencies | null, // contexts、events 等依赖
  
  mode: TypeOfMode,
  
  // 副作用相关
  flags: Flags, // 记录更新时当前 fiber 的副作用(删除、更新、替换等)状态
  subtreeFlags: Flags, // 当前子树的副作用状态
  deletions: Array<Fiber> | null, // 要删除的子 fiber
  nextEffect: Fiber | null, // 下一个有副作用的 fiber
  firstEffect: Fiber | null, // 指向第一个有副作用的 fiber
  lastEffect: Fiber | null, // 指向最后一个有副作用的 fiber 
  
  // 优先级相关
  lanes: Lanes,
  childLanes: Lanes,
  
  alternate: Fiber | null, // 指向 workInProgress fiber 树中对应的节点
  
  actualDuration?: number,
  actualStartTime?: number,
  selfBaseDuration?: number,
  treeBaseDuration?: number,
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean,
  _debugNeedsRemount?: boolean,
  _debugHookTypes?: Array<HookType> | null,
};
```
