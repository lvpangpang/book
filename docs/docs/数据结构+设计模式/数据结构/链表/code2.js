// 虚拟头指针-dummy结点的使用


// 0.删除链表元素-给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
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


// 1. 删除链表元素-给定一个排序链表， 删除所有含有重复数字的结点， 只保留原始链表中 没有重复出现的数字。
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {
  if (!head && !head.next) {
    return head
  }
  let temp = new ListNode()
  temp.next = head
  let cur = temp
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let val = cur.next.val
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next
      }
    } else {
      cur = cur.next
    }
  }
  return temp.next
}


// 2.移除链表元素-删除链表中等于给定值 val 的所有节点。
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// 构造虚拟节点
var removeElements = function (head, val) {
  var temp = new ListNode()
  temp.next = head
  var a = temp // 经常会忘记这点
  while (a && a.next) {
    if (a.next.val === val) {
      a.next = a.next.next
    } else {
      a = a.next
    }
  }
  return temp.next
}



// 3. 删除链表的倒数第 N 个结点-给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
/* 可以直接先一遍遍历整个链表计算出长度l，然后删除第l-n+1个节点 */
const removeNthFromEnd = function (head, n) {
  let len = 0
  let cur = head
  while (cur) {
    len++
    cur = cur.next
  }
  let cur1 = head
  let index = len - n - 1
  let k = 0
  while (cur1) {
    k++
    if (j === index) {
      cur1.next = cur1.next.next
    }
    cur1 = cur1.next
  }
}


// 4.存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
// 返回同样按升序排列的结果链表。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let tem = head
  while (tem && tem.next) {
    if (tem.val === tem.next.val) {
      tem.next = tem.next.next
    } else {
      tem = tem.next
    }
  }
  return head
}



// 5.输入：节点 5 （位于单向链表 4->5->1->9 中）
// 输出：不返回任何数据，从链表中删除传入的节点 5，使链表变为 4->1->9
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}

