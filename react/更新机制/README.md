# 更新机制

触发更新 -> 创建 Update -> 调度 -> render -> commit

1. 触发更新
   ReactDom.render()
   this.setState()
   this.forceUpdate()
   useState()
   useReducer()

2. 创建 update
   主要是获取更新触发时间 eventtIme 以及任务优先级 lane，然后调用 scheduleUpdateOnFiber(fiber, lane, eventTime)从当前 fiber 向上遍历到 rootFiber

3. 调度
   分为同步任务
   js 线程空闲情况-performSyncWorkOnRoot(root);
   js 线程不空闲情况-ensureRootIsScheduled(root, eventTime)
   异步任务
   ensureRootIsScheduled(root, eventTime)
   performConcurrentWorkOnRoot() - 判断 shouldYield()的值
   以上 2 种情况都会执行 performUnitOfWork()

4. render
   performUnitOfWork 中会以 fiber 作为单元，进行协调过程
   每次 beginWork （调用 reconcileChildren，diff 就是发生在这里）执行后都会更新 workIngProgress， 对于 workInProgress 的 tag，执行相应的更新
   直至 fiber 树遍历完成后，workInProgress 此时置为 null，执行 completeUnitOfWork 函数
   completeUnitOfWork 方法中主要是逐层收集 effects 链，最终收集到 root 上，供接下来的 commit 阶段使用。

5. commit
   对 effectList 进行第一次遍历，执行 commitBeforeMutationEffects 函数来更新 class 组件实例上的 state、props 等，以及执行 getSnapshotBeforeUpdate 生命周期函数
   对 effectList 进行第二次遍历，执行 commitMutationEffects 函数来完成副作用的执行，主要包括重置文本节点以及真实 dom 节点的插入、删除和更新等操作。
   对 effectList 进行第三次遍历，执行 commitLayoutEffects 函数，去触发 componentDidMount、componentDidUpdate 以及各种回调函数等
