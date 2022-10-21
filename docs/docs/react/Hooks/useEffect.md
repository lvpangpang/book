# useEffect

## 1 使用

```js
import { useEffect } from 'react'
function Example() {
  useEffect(() => {
    document.querySelector('#root').innerHTML = '吕肥肥'
  }, [])

  return <div>吕肥肥</div>
}
```

## 源码

1. 声明阶段

```js
export function useEffect(create, deps) {
  const dispatcher = resolveDispatcher()
  return dispatcher.useEffect(create, deps)
}
```

2. mount 阶段
   ​ 调用 mountEffect，mountEffect 调用 mountEffectImpl，hook.memoizedState 赋值为 effect 链表

```js
function mountEffectImpl(fiberFlags, hookFlags, create, deps): void {
  const hook = mountWorkInProgressHook() //获取hook
  const nextDeps = deps === undefined ? null : deps //依赖
  currentlyRenderingFiber.flags |= fiberFlags //增加flag
  hook.memoizedState = pushEffect(
    //memoizedState=effects环状链表
    HookHasEffect | hookFlags,
    create,
    undefined,
    nextDeps
  )
}
```

3. update 阶段
   浅比较依赖，如果依赖性变了 pushEffect 第一个参数传 HookHasEffect | hookFlags，HookHasEffect 表示 useEffect 依赖项改变了，需要在 commit 阶段重新执行

```js
function updateEffectImpl(fiberFlags, hookFlags, create, deps): void {
  const hook = updateWorkInProgressHook()
  const nextDeps = deps === undefined ? null : deps
  let destroy = undefined

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState
    destroy = prevEffect.destroy //
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        //比较deps
        //即使依赖相等也要将effect加入链表，以保证顺序一致
        pushEffect(hookFlags, create, destroy, nextDeps)
        return
      }
    }
  }

  currentlyRenderingFiber.flags |= fiberFlags

  hook.memoizedState = pushEffect(
    //参数传HookHasEffect | hookFlags，包含hookFlags的useEffect会在commit阶段执行这个effect
    HookHasEffect | hookFlags,
    create,
    destroy,
    nextDeps
  )
}
```

4. 执行阶段

在第 9 章 commit 阶段的 commitLayoutEffects 函数中会调用 schedulePassiveEffects，将 useEffect 的销毁和回调函数 push 到 pendingPassiveHookEffectsUnmount 和 pendingPassiveHookEffectsMount 中，然后在 mutation 之后调用 flushPassiveEffects 依次执行上次 render 的销毁函数回调和本次 render 的回调函数

```js
const unmountEffects = pendingPassiveHookEffectsUnmount
pendingPassiveHookEffectsUnmount = []
for (let i = 0; i < unmountEffects.length; i += 2) {
  const effect = ((unmountEffects[i]: any): HookEffect)
  const fiber = ((unmountEffects[i + 1]: any): Fiber)
  const destroy = effect.destroy
  effect.destroy = undefined

  if (typeof destroy === 'function') {
    try {
      destroy() //销毁函数执行
    } catch (error) {
      captureCommitPhaseError(fiber, error)
    }
  }
}

const mountEffects = pendingPassiveHookEffectsMount
pendingPassiveHookEffectsMount = []
for (let i = 0; i < mountEffects.length; i += 2) {
  const effect = ((mountEffects[i]: any): HookEffect)
  const fiber = ((mountEffects[i + 1]: any): Fiber)

  try {
    const create = effect.create //本次render的创建函数
    effect.destroy = create()
  } catch (error) {
    captureCommitPhaseError(fiber, error)
  }
}
```

## 简单实现

```js
const allDeps = []
let cursor = 0

function useEffect(callback, depsList) {
  // 新的effect直接执行函数
  if (!allDeps[cursor]) {
    allDeps[cursor] = depsList
    ++cursor
    callback()
    return
  }
  const rawDeps = allDeps[cursor]
  // 比较前后2次依赖数组是否有变化
  const isChanged = rawDeps.some((dep, index) => {
    dep !== depsList[index]
  })
  if (isChanged) {
    callback()
    allDeps[cursor] = depsList
  }
  ++cursor
}

function render() {
  effectSursor = 0 // 注意将 cursor 重置为0
  ReactDOM.render(<App />, document.querySelector('#toot'))
}
```
