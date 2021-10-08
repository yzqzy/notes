### 删除链表的倒数第N个节点

给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

#### 1. 示例

给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.

说明：

  给定的 n 保证是有效的。

进阶：

  你能尝试使用一趟扫描实现吗？

#### 2. 解题思路

  1. 创建一个dummy节点指向第一个节点，用以解决单节点删除问题。

  2. 创建两个指针，两个指针间隔 n + 1 的长度，向后迭代。

    n + 1是因为需要操作待删除节点的上一个节点，将上一个节点指向下一个节点。

#### 3. 代码实现

```js
/**
 * @description 删除链表的倒数第N个节点
 * @param {ListNode} head - 单向链表的头部
 * @param {number} n
 * @return {ListNode} 
 */
var removeNthFromEnd = function(head, n) {
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
```