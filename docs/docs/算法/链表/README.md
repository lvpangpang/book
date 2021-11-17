# 链表

## 1.结构示意
```json
{
  // 数据域
  val: 1,
  // 指针域，指向下一个结点
  next: {
      val:2,
      next: ...
  }
}
```

## 2.注意点
1. 链表和数组相似，它们都是有序的列表、都是线性结构（有且仅有一个前驱、有且仅有一个后继）。
2. 在链表中，每一个结点的结构都包括了两部分的内容：数据域和指针域。
3. JS 中的链表，是以嵌套的对象的形式来实现的。
4. 创建链表结点，咱们需要一个构造函数：
```javascript
  function ListNode(val) {
    this.val = val;
    this.next = null;
  }
```
在使用构造函数创建结点时，传入 val （数据域对应的值内容）、指定 next （下一个链表结点）即可：
```javascript
  const node = new ListNode(1)
  node.next = new ListNode(2)
```
5. 在涉及链表删除操作的题目中，重点不是定位目标结点，而是定位目标结点的前驱结点。
6. 链表的插入/删除效率较高，而访问效率较低；数组的访问效率较高，而插入效率较低。

## 3.典型题目
1. 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
```javascript
const deleteDuplicates = function (head) {
  let cur = head
  while (cur !== null && cur.next !== null) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}
```

2. 除链表元素-删除链表中等于给定值 val 的所有节点。
```javascript
var removeElements = function (head, val) {
  var temp = new ListNode()
  temp.next = head
  var a = temp // 经常会忘记这点, 因为最后要返回整个链表的头部，也就是整个对象，而不是最里面的子对象
  while (a && a.next) {
    if (a.next.val === val) {
      a.next = a.next.next
    } else {
      a = a.next
    }
  }
  return temp.next
}
```

3. 输入：节点 5 （位于单向链表 4->5->1->9 中）输出：不返回任何数据，从链表中删除传入的节点 5，使链表变为 4->1->9
```javascript
var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}
```

4. 反转链表
```javascript
var reverseList = function (head) {
  let [prev, curr] = [null, head]
  while (curr) {
    ;[curr.next, prev, curr] = [prev, curr, curr.next]
  }
  return prev
}
```

5. 合并2个长度不一样的链表，并且从小到大排序
```javascript
const mergeTwoLists = function (l1, l2) {
  let head = new ListNode()
  let cur = head
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 !== null ? l1 : l2
  return head.next
}
```

6. 给定一个链表，判断链表中是否有环。为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。
```javascript
function hasCycle(head) {
  let slow = head
  let fast = head
  while (fast) {
    if (!fast.next) {
      return false
    }
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      return true
    }
  }
  return false
}
```
