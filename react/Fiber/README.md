# Fiber

异步可中断的更新需要一定的数据结构在内存中来保存工作单元的信息，这个数据结构就是 Fiber。

## 1. Fiber 作用

- 工作单元 任务分解 ：Fiber 最重要的功能就是作为工作单元，保存原生节点或者组件节点对应信息（包括优先级），这些节点通过指针的形似形成 Fiber 树
- 增量渲染：通过 jsx 对象和 current Fiber 的对比，生成最小的差异补丁，应用到真实节点上
- 根据优先级暂停、继续、排列优先级：Fiber 节点上保存了优先级，能通过不同节点优先级的对比，达到任务的暂停、继续、排列优先级等能力，也为上层实现批量更新、Suspense 提供了基础
- 保存状态：因为 Fiber 能保存状态和更新的信息，所以就能实现函数组件的状态更新，也就是 hooks

## 2. 核心代码

```js
//ReactFiber.old.js
function FiberNode(tag: WorkTag, pendingProps: mixed, key: null | string, mode: TypeOfMode) {
  //作为静态的数据结构 保存节点的信息
  this.tag = tag //对应组件的类型
  this.key = key //key属性
  this.elementType = null //元素类型
  this.type = null //func或者class
  this.stateNode = null //真实dom节点

  //作为fiber数架构 连接成fiber树
  this.return = null //指向父节点
  this.child = null //指向child
  this.sibling = null //指向兄弟节点
  this.index = 0

  this.ref = null

  //用作为工作单元 来计算state
  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null // 这个属性很重要，更新的对象
  this.memoizedState = null
  this.dependencies = null

  this.mode = mode

  //effect相关
  this.effectTag = NoEffect
  this.nextEffect = null
  this.firstEffect = null
  this.lastEffect = null

  //优先级相关的属性
  this.lanes = NoLanes
  this.childLanes = NoLanes

  //current和workInProgress的指针
  this.alternate = null
}
```

