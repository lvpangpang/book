// 虚拟头指针-dummy结点的使用

// 0.删除链表元素-给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {
  let cur = head;
  while (cur !== null && cur.next !== null) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
};

// 1. 删除链表元素-给定一个排序链表， 删除所有含有重复数字的结点， 只保留原始链表中 没有重复出现的数字。
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {
  if (!head && !head.next) {
    return head;
  }
  let temp = new ListNode();
  temp.next = head;
  let cur = temp;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let val = cur.next.val;
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return temp.next;
};


// 2.移除链表元素-删除链表中等于给定值 val 的所有节点。
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// 构造虚拟节点
var removeElements = function (head, val) {
  var temp = new ListNode();
  temp.next = head;
  var a = temp; // 经常会忘记这点
  while (a && a.next) {
    if (a.next.val === val) {
      a.next = a.next.next;
    } else {
      a = a.next;
    }
  }
  return temp.next;
};

// 3.环形链表（双指针）
/* 给定一个链表，判断链表中是否有环。为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。 */
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast) {
    if (!fast.next) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

// 4. 重排列表（双指针）
/* 
给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。 
*/
var reorderList = function (head) {
  let arr = [];
  let temp = null;
  while (head) {
    temp = head.next;
    head.next = null;
    arr.push(head);
    head = temp;
  }
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    arr[left].next = arr[right];
    if (left + 1 !== right) {
      arr[right].next = arr[left + 1];
    }
    left++;
    right--;
  }
  return arr[0];
};

// 5 排序链表-断开所有的链表放数组，再从小到大重新连起来
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  let arr = [];
  let temp = null;
  while (head) {
    temp = head.next;
    head.next = null;
    arr.push(head);
    head = temp;
  }
  arr.sort((a, b) => {
    return a.val - b.val
  }).reduce((p, v) => p.next = v);
  return arr[0];
};

// 6. 反转链表-反转一个单链表。
var reverseList = function (head) {
  let [prev, curr] = [null, head];
  while (curr) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
  }
  return prev;
};

// 7. 合并2个已排序不等长的链表
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  let head = new ListNode();
  let cur = head;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 !== null ? l1 : l2;
  return head.next;
}