# commit

commit 阶段主要做的是根据之前生成的 effectList，对相应的真实 dom 进行更新和渲染，这个阶段是不可中断的。

1. 获取 effectList 链表，如果 root 上有 effect，则将其也添加进 effectList 中
2. 对 effectList 进行第一次遍历，执行 commitBeforeMutationEffects 函数来更新 class 组件实例上的 state、props 等，以及执行 getSnapshotBeforeUpdate 生命周期函数
3. 对 effectList 进行第二次遍历，执行 commitMutationEffects 函数来完成副作用的执行，主要包括重置文本节点以及真实 dom 节点的插入、删除和更新等操作。
4. 对 effectList 进行第三次遍历，执行 commitLayoutEffects 函数，去触发 componentDidMount、componentDidUpdate 以及各种回调函数等
5. 最后进行一点变量还原之类的收尾，就完成了 commit 阶段

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function commitRoot(root) {
  const renderPriorityLevel = getCurrentPriorityLevel()
  runWithPriority(ImmediateSchedulerPriority, commitRootImpl.bind(null, root, renderPriorityLevel))
  return null
}

// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function commitRootImpl(root, renderPriorityLevel) {
  // ...
  const finishedWork = root.finishedWork
  const lanes = root.finishedLanes
  // ...

  // 获取 effectList 链表
  let firstEffect
  if (finishedWork.flags > PerformedWork) {
    // 如果 root 上有 effect，则将其添加进 effectList 链表中
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork
      firstEffect = finishedWork.firstEffect
    } else {
      firstEffect = finishedWork
    }
  } else {
    // 如果 root 上没有 effect，直接使用 finishedWork.firstEffect 作用链表头节点
    firstEffect = finishedWork.firstEffect
  }

  if (firstEffect !== null) {
    // ...

    // 第一次遍历，执行 commitBeforeMutationEffects
    nextEffect = firstEffect
    do {
      commitBeforeMutationEffects()
    } while (nextEffect !== null)

    // ...
    // 第二次遍历，执行 commitMutationEffects
    nextEffect = firstEffect
    do {
      commitMutationEffects(root, renderPriorityLevel)
    } while (nextEffect !== null)

    // 第三次遍历，执行 commitLayoutEffects
    nextEffect = firstEffect
    do {
      commitLayoutEffects(root, lanes)
    } while (nextEffect !== null)

    nextEffect = null

    // ...
  } else {
    // 没有任何副作用
    root.current = finishedWork
    if (enableProfilerTimer) {
      recordCommitTime()
    }
  }

  // ...
}
```

## 1 commitBeforeMutationEffects

commitBeforeMutationEffects 中，会从 firstEffect 开始，通过 nextEffect 不断对 effectList 链表进行遍历，若是当前的 fiber 节点有 flags 副作用，则执行 commitBeforeMutationEffectOnFiber 节点去对针对 class 组件单独处理。

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    // ...
    const flags = nextEffect.flags
    if ((flags & Snapshot) !== NoFlags) {
      // 如果当前 fiber 节点有 flags 副作用
      commitBeforeMutationEffectOnFiber(current, nextEffect)
      // ...
    }
    // ...
    nextEffect = nextEffect.nextEffect
  }
}
```

## 2 commitMutationEffects

commitMutationEffects 中会根据对 effectList 进行第二次遍历，根据 flags 的类型进行二进制与操作，然后根据结果去执行不同的操作，对真实 dom 进行修改：

- ContentReset: 如果 flags 中包含 ContentReset 类型，代表文本节点内容改变，则执行 commitResetTextContent 重置文本节点的内容
- Ref: 如果 flags 中包含 Ref 类型，则执行 commitDetachRef 更改 ref 对应的 current 的值
- Placement: 上一章 diff 中讲过 Placement 代表插入，会执行 commitPlacement 去插入 dom 节点
- Update: flags 包含 Update 则会执行 commitWork 执行更新操作
- Deletion: flags 包含 Deletion 则会执行 commitDeletion 执行更新操作

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function commitMutationEffects(root: FiberRoot, renderPriorityLevel: ReactPriorityLevel) {
  // 对 effectList 进行遍历
  while (nextEffect !== null) {
    setCurrentDebugFiberInDEV(nextEffect)

    const flags = nextEffect.flags

    // ContentReset：重置文本节点
    if (flags & ContentReset) {
      commitResetTextContent(nextEffect)
    }

    // Ref：commitDetachRef 更新 ref 的 current 值
    if (flags & Ref) {
      const current = nextEffect.alternate
      if (current !== null) {
        commitDetachRef(current)
      }
      if (enableScopeAPI) {
        if (nextEffect.tag === ScopeComponent) {
          commitAttachRef(nextEffect)
        }
      }
    }

    // 执行更新、插入、删除操作
    const primaryFlags = flags & (Placement | Update | Deletion | Hydrating)
    switch (primaryFlags) {
      case Placement: {
        // 插入
        commitPlacement(nextEffect)
        nextEffect.flags &= ~Placement
        break
      }
      case PlacementAndUpdate: {
        // 插入并更新
        // 插入
        commitPlacement(nextEffect)
        nextEffect.flags &= ~Placement

        // 更新
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // ...
      case Update: {
        // 更新
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      case Deletion: {
        // 删除
        commitDeletion(root, nextEffect, renderPriorityLevel)
        break
      }
    }
    resetCurrentDebugFiberInDEV()
    nextEffect = nextEffect.nextEffect
  }
}
```

## 3 commitLayoutEffects

接下来通过 commitLayoutEffects 为入口函数，执行第三次遍历，这里会遍历 effectList，执行 componentDidMount、componentDidUpdate 等生命周期，另外会执行 componentUpdateQueue 函数去执行回调函数。

```js
// packages/react-reconciler/src/ReactFiberWorkLoop.old.js
function commitLayoutEffects(root: FiberRoot, committedLanes: Lanes) {
  // ...

  // 遍历 effectList
  while (nextEffect !== null) {
    setCurrentDebugFiberInDEV(nextEffect)

    const flags = nextEffect.flags

    if (flags & (Update | Callback)) {
      const current = nextEffect.alternate
      // 执行 componentDidMount、componentDidUpdate 以及 componentUpdateQueue
      commitLayoutEffectOnFiber(root, current, nextEffect, committedLanes)
    }

    // 更新 ref
    if (enableScopeAPI) {
      if (flags & Ref && nextEffect.tag !== ScopeComponent) {
        commitAttachRef(nextEffect)
      }
    } else {
      if (flags & Ref) {
        commitAttachRef(nextEffect)
      }
    }

    resetCurrentDebugFiberInDEV()
    nextEffect = nextEffect.nextEffect
  }
}
```
