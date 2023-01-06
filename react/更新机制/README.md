# 更新机制

## 1 渲染阶段(Render phase)

1. performUnitOfWork
2. beginWork
3. completeUnitOfWork
4. completeWork

## 2 提交阶段(Commit phase)

该阶段从函数 completeRoot 开始。这是 React 更新 DOM 并调用更新前及更新后(pre and post mutation)生命周期方法的地方。

1. 在标记有 Snapshot 效果(effect)的节点上调用 getSnapshotBeforeUpdate 生命周期方法
2. 在标记有 Deletion 效果(effect)的节点上调用 componentWillUnmount 生命周期方法
3. 执行所有的 DOM 插入、更新和删除操作
4. 将 finishedWork 树设置为 current tree
5. 在标记有 Placement 效果(effect)的节点上调用 componentDidMount 生命周期方法
6. 在标记有 Update 效果(effect)的节点上调用 componentDidUpdate 生命周期方法

## 3 setState 后发生了什么？

### 3.1 V16 版本

老版本的逻辑大概是，有一把“锁”—— isBatchingUpdates 全局变量，isBatchingUpdates 的初始值是 false。每当 React 调用 batchedUpdate 去执行更新动作时，会先把这个锁给“锁上”（置为 true），表明“现在正处于批量更新过程中”。当锁被“锁上”的时候，任何需要更新的组件都只能暂时进入 dirtyComponents 里排队等候下一次的批量更新，而不能随意“插队”。

### 3.3 V17 版本

触发更新 -> 创建 Update -> 从更新的 fiber 节点向上遍历到 rootFiber -> 调度 -> render -> commit
