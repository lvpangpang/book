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


存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
返回同样按升序排列的结果链表。

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


输入：节点 5 （位于单向链表 4->5->1->9 中）
输出：不返回任何数据，从链表中删除传入的节点 5，使链表变为 4->1->9
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
var deleteNode = function(node) {
  node.val = node.next.val
  node.next = node.next.next
};



/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let tem1 = headA
  let tem2 = headB
  while(tem1&&tem2) {
    if(tem1.next===tem2.next) {
      return tem1
    }
    tem1 = tem1.next
    tem2 = tem2.next
  }
  return null
};


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
  if(!head || !head.next) {
    return head
  }
  let dummy = new ListNode() 
  dummy.next = head   
  let cur = dummy 
  while(cur.next) {
    if(cur.next.val === val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return dummy.next;
};



给定一个头结点为 head 的非空单链表，返回链表的中间结点。
如果有两个中间结点，则返回第二个中间结点。
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
var middleNode = function(head) {
  if(!head||!head.next) {
    return head
  }
  let cur = head
  let tem = head
  let num = 0
  while(cur) {
    num++
    cur = cur.next
  }
  const middle = Math.floor(num/2)
  num = 0
  while(tem) {
    num++ 
    if(num===middle) {
      return tem.next
    }
    tem = tem.next
  }

  return null

};

请判断一个链表是否为回文链表。

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
var isPalindrome = function(head) {
  let len = 0
  let num = 0
  let cur = tem = cc = kk =  head
  while(cur) {
    len++
    cur = cur.next
  }
  const mid = Math.floor(len/2)
  while(tem) {
    num++
    if(num===mid) {
      if(len%2===0) {
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
  while(cc&&kk) {
    if(cc.val!==kk.val) {
      return false
    }
    cc = cc.next
    kk = kk.next
  }

  return true

};