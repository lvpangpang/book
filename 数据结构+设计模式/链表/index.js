// 1.移除链表元素
// 删除链表中等于给定值 val 的所有节点。
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// 构造虚拟节点
var removeElements = function(head, val) {
  var temp = new ListNode();
  temp.next = head;
  var a = temp; // 经常会忘记这点
  while(a.next) {
    if(a.next.val===val) {
      a.next = a.next.next;
    } else {
      a = a.next;
    }
  }
  return temp.next;
};

// 2.环形链表（双指针）
/* 给定一个链表，判断链表中是否有环。为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。 */
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while(fast) {
    if(!fast.next) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
    if(slow===fast) {
      return true;
    }
  }
  return false;
}

// 3. 重排列表（双指针）
/* 
给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。 
*/
var reorderList = function(head) {
  let arr = [];
  let temp = null;
  while(head) {
    temp = head.next;
    head.next = null;
    arr.push(head);
    head = temp;
  }
  let left = 0;
  let right = arr.length -1;
  while(left<right) {
    arr[left].next = arr[right];
    if(left+1!==right) {
      arr[right].next = arr[left+1];
    }
    left++;
    right--;
  }
  return arr[0]; 
};

// 4 排序链表-断开所有的链表放数组，再从小到大重新连起来
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  let arr = [];
  let temp = null;
  while(head) {
    temp = head.next;
    head.next = null;
    arr.push(head);
    head = temp;
  }
  arr.sort((a, b) => {return a.val - b.val}).reduce((p, v) => p.next = v);
  return arr[0];
};

// 5. 反转链表
// 反转一个单链表。
var reverseList = function(head) {
  let [prev, curr] = [null, head];
  while (curr) {
      [curr.next, prev, curr] = [prev, curr, curr.next];
  }
  return prev;
};

// 6.  反转链表 II
/* 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
说明:
1 ≤ m ≤ n ≤ 链表长度。 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {

};
