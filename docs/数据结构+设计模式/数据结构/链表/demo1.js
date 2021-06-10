{
  "val": 1,
  "next": {
    "val": 2,
    "next": {
      "val": 3,
      "next": {
        val: 4,
        next: null
      }

    }
  }
}

var getKthFromEnd = function (head, k) {
  let len = 0
  let temp = head
  while (temp) {
    len++
    temp = temp.next
  }
  let res = len - k + 1
  let t = head
  while (res) {
    t = t.next
    res--
  }
  return t
}


// 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
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
var deleteDuplicates = function(head) {
  let tem = head
  while(tem&&tem.next) {
    if(tem.val===tem.next.val) {
      tem.next = tem.next.next
    } else {
      tem = tem.next
    }
  }
  return head
};