#### Hooks

1. useState+useEffect
```
const MyReact = (function() {
  let hooks = [],
    currentHook = 0 // hooks数组, 和一个iterator!
  return {
    render(Component) {
      const Comp = Component() // 运行 effects
      Comp.render()
      currentHook = 0 // 复位，为下一次render做准备
      return Comp
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray
      const deps = hooks[currentHook] // type: array | undefined
      const hasChangedDeps = deps ? !depArray.every((el, i) => el === deps[i]) : true
      if (hasNoDeps || hasChangedDeps) {
        callback()
        hooks[currentHook] = depArray
      }
      currentHook++ // 本hook运行结束
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue // type: any
      const setStateHookIndex = currentHook // 给setState的闭包准备的变量!
      const setState = newState => (hooks[setStateHookIndex] = newState)
      return [hooks[currentHook++], setState]
    }
  }
})()
```