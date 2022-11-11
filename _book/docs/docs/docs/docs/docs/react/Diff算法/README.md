# Diffing 算法

## 1.三大策略

React 用 三大策略 将 O(n^3)复杂度 转化为 O(n)复杂度

1. 只对同级比较，跨层级的 dom 不会进行复用
2. 不同类型节点生成的 dom 树不同，此时会直接销毁老节点及子孙节点，并新建节点
3. 可以通过 key 来对元素 diff 的过程提供复用的线索

## 2.单节点 diff

1. key 和 type 相同表示可以复用节点
2. key 不同直接标记删除节点，然后新建节点
3. key 相同 type 不同，标记删除该节点和兄弟节点，然后新创建节点

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
