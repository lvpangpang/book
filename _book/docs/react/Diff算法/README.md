# Diff 算法

1. current Fiber。如果该 DOM 节点已在页面中，current Fiber 代表该 DOM 节点对应的 Fiber 节点。
2. workInProgress Fiber。如果该 DOM 节点将在本次更新中渲染到页面中，workInProgress Fiber 代表该 DOM 节点对应的 Fiber 节点。
3. DOM 节点本身。
4. JSX 对象。即 ClassComponent 的 render 方法的返回结果，或者 FunctionComponent 的调用结果，JSX 对象中包含描述 DOM 节点信息。

比较的是当前节点的旧 fiber 对象和新虚拟 dom 对象比较，生成新 fiber 对象

## 1.三大策略

React 用 三大策略 将 O(n^3)复杂度 转化为 O(n)复杂度

1. 只对同级比较，跨层级的 dom 不会进行复用
2. 不同类型节点生成的 dom 树不同，此时会直接销毁老节点及子孙节点，并新建节点
3. 可以通过 key 来对元素 diff 的过程提供复用的线索

## 2.单节点 diff

具体比较逻辑

1. 先比较 key，key 不同仅将 child 标记删除。
2. 再比较 type，type 不同将 child 及其兄弟 fiber 都标记删除。
3. key，type 都相同则根据新的 props 来更新旧有的 fiber 节点

```js
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement
): Fiber {
  const key = element.key
  let child = currentFirstChild

  //child节点不为null执行对比
  while (child !== null) {
    // 1.比较key
    if (child.key === key) {
      // 2.比较type

      switch (child.tag) {
        //...

        default: {
          if (child.elementType === element.type) {
            // type相同则可以复用 返回复用的节点
            return existing
          }
          // type不同跳出
          break
        }
      }
      //key相同，type不同则把fiber及和兄弟fiber标记删除
      deleteRemainingChildren(returnFiber, child)
      break
    } else {
      //key不同直接标记删除该节点
      deleteChild(returnFiber, child)
    }
    child = child.sibling
  }

  //新建新Fiber
}
```
