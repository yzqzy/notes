### 两两交换链表中的节点

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

#### 1. 示例

  给定 1->2->3->4, 你应该返回 2->1->4->3.

#### 2. 解题思路

  1. n1 = p.next
  2. n2 = p.next.next
  3. p.next = n2
  4. n1.next = n2.next
  5. n2.next = n1
  6. p = n1

  不断执行上述步骤，直至n1或者n2为空。

  示意图：

  ![sd](./images/sd.png)

#### 3. 代码实现

```js
/**
 * @description 两两交换链表中的节点
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  let dummy = new ListNode();

  dummy.next = head;

  let current = dummy;

  while (current.next !== null
    &&current.next.next !== null) {
    let n1 = current.next,
        n2 = current.next.next;

    current.next = n2;
    n1.next = n2.next;
    n2.next = n1;
    current = n1;
  }

  return dummy.next;
};
```