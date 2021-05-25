/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @description 删除链表的倒数第N个节点
 * @param {ListNode} head - 单向链表的头部
 * @param {number} n
 * @return {ListNode} 
 */
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode();

  dummy.next = head;

  let n1 = dummy,
      n2 = dummy;

  for (let i = 0; i <= n; i++) {
    n2  = n2.next;
  }

  while (n2 !== null) {
    n1 = n1.next;
    n2 = n2.next;
  }

  n1.next = n1.next.next;

  return dummy.next;
};