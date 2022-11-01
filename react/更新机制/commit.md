# commit

commit 阶段主要做的是根据之前生成的 effectList，对相应的真实 dom 进行更新和渲染，这个阶段是不可中断的。

1. 获取 effectList 链表，如果 root 上有 effect，则将其也添加进 effectList 中
2. 对 effectList 进行第一次遍历，执行 commitBeforeMutationEffects 函数来更新 class 组件实例上的 state、props 等，以及执行 getSnapshotBeforeUpdate 生命周期函数
3. 对 effectList 进行第二次遍历，执行 commitMutationEffects 函数来完成副作用的执行，主要包括重置文本节点以及真实 dom 节点的插入、删除和更新等操作。
4. 对 effectList 进行第三次遍历，执行 commitLayoutEffects 函数，去触发 componentDidMount、componentDidUpdate 以及各种回调函数等
5. 最后进行一点变量还原之类的收尾，就完成了 commit 阶段
