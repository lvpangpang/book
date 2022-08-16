# Fiber
核心思想是 任务拆分和协同，主动把执行权交给主线程，使主线程有时间空挡处理其他高优先级任务。

## 1. 核心代码
```js
class Fiber {
  constructor(instance) {
    this.instance = instance
    this.child = child
    this.return = parent
    this.sibling = previous
  }
}
```

## 2. 渲染更新
1. reconciliation 阶段（调和）: vdom 的数据对比，是个适合拆分的阶段，比如对比一部分树后，先暂停执行个动画调用，待完成后再回来继续比对
2. Commit 阶段: 将 change list 更新到 dom 上，并不适合拆分，才能保持数据与 UI 的同步。否则可能由于阻塞 UI 更新，而导致数据更新和 UI 不一致的情况