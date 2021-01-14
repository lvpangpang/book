// 快慢指针+多指针

// 0. 删除链表的倒数第 N 个结点-给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
/* 可以直接先一遍遍历整个链表计算出长度l，然后删除第l-n+1个节点 */
const removeNthFromEnd = function (head, n) {
  let len = 0;
  let cur = head;
  while (cur) {
    len++;
    cur = cur.next;
  }
  let cur1 = head;
  let index = len - n - 1;
  let k = 0;
  while (cur1) {
    k++;
    if(j===index) {
      cur1.next = cur1.next.next;
    }
    cur1 = cur1.next;

  }
}