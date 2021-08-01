// 链表数据结构实例
// {
//   "val": 1,
//   "next": {
//     "val": 2,
//     "next": {
//       "val": 3,
//       "next": {
//         val: 4,
//         next: null
//       }

//     }
//   }
// }

//

// 给定一个头结点为 head 的非空单链表，返回链表的中间结点。
// 如果有两个中间结点，则返回第二个中间结点。
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
var middleNode = function (head) {
  if (!head || !head.next) {
    return head
  }
  let cur = head
  let tem = head
  let num = 0
  while (cur) {
    num++
    cur = cur.next
  }
  const middle = Math.floor(num / 2)
  num = 0
  while (tem) {
    num++
    if (num === middle) {
      return tem.next
    }
    tem = tem.next
  }

  return null
}



// 请判断一个链表是否为回文链表。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let len = 0
  let num = 0
  let cur = (tem = cc = kk = head)
  while (cur) {
    len++
    cur = cur.next
  }
  const mid = Math.floor(len / 2)
  while (tem) {
    num++
    if (num === mid) {
      if (len % 2 === 0) {
        kk = tem.next
        tem.next = null
      } else {
        kk = tem.next.next
        tem.next = null
      }
      break
    }
    tem = tem.next
  }
  cc = head
  while (cc && kk) {
    if (cc.val !== kk.val) {
      return false
    }
    cc = cc.next
    kk = kk.next
  }

  return true
}


// 给定两个用链表表示的整数，每个节点包含一个数位。
// 这些数位是反向存放的，也就是个位排在链表首部。
// 编写函数对这两个整数求和，并用链表形式返回结果。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 输入：(7 -> 1 -> 6) + (5 -> 9 -> 2)，即617 + 295
// 输出：2 -> 1 -> 9，即912
//   (2, 4, 3)
// ][(5, 6, 4)]
var addTwoNumbers = function (l1, l2) {
  let n = new ListNode(0)
  let cur = n
  let cur1 = l1
  let cur2 = l2
  let temp = 0
  while (cur1 || cur2) {
    let num1 = cur1?.val || 0
    let num2 = cur2?.val || 0
    let sum = num1 + num2 + temp
    temp = Math.floor(sum / 10)
    cur.next = new ListNode(sum%10)
    cur = cur.next
    cur1 = cur1?.next
    cur2 = cur2?.next
  }
  if (temp) cur.next = new ListNode(temp)
  return n.next
}


// 环形链表（双指针）
/* 给定一个链表，判断链表中是否有环。为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。 */
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

// 重排列表（双指针）
/* 
给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。 
*/
var reorderList = function (head) {
  let arr = []
  let temp = null
  while (head) {
    temp = head.next
    head.next = null
    arr.push(head)
    head = temp
  }
  let left = 0
  let right = arr.length - 1
  while (left < right) {
    arr[left].next = arr[right]
    if (left + 1 !== right) {
      arr[right].next = arr[left + 1]
    }
    left++
    right--
  }
  return arr[0]
}


// 排序链表-断开所有的链表放数组，再从小到大重新连起来
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  let arr = []
  let temp = null
  while (head) {
    temp = head.next
    head.next = null
    arr.push(head)
    head = temp
  }
  arr
    .sort((a, b) => {
      return a.val - b.val
    })
    .reduce((p, v) => (p.next = v))
  return arr[0]
}



// 反转链表-反转一个单链表。
var reverseList = function (head) {
  let [prev, curr] = [null, head]
  while (curr) {
    ;[curr.next, prev, curr] = [prev, curr, curr.next]
  }
  return prev
}



// 合并2个已排序不等长的链表
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
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