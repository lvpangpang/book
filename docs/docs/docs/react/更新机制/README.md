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
