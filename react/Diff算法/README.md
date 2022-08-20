# Diffing 算法

## 1.三大策略

React 用 三大策略 将 O(n^3)复杂度 转化为 O(n)复杂度

1. 策略一（tree diff）：
   只对同级的 react element 进行对比。如果一个 DOM 节点在前后两次更新中跨越了层级，那么 React 不会尝试复用它；

2. 策略二（component diff）：
   两个不同类型（type 字段不一样）的 react element 会产生不同的 react element tree。例如元素 div 变为 p，React 会销毁 div 及其子孙节点，并新建 p 及其子孙节点；

3. 策略三（element diff）：
   对于同一层级的一组子节点，通过唯一 id 区分。

## 2.单节点 diff

- key 和 type 相同表示可以复用节点
- key 不同直接标记删除节点，然后新建节点
- key 相同 type 不同，标记删除该节点和兄弟节点，然后新创建节点
