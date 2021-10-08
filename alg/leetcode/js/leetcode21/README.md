### 合并两个有序链表

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

#### 1. 示例

  输入：1->2->4, 1->3->4
  输出：1->1->2->3->4->4

#### 2. 解题思路

  循环实现

    1. 声明一个新链表

    2. 循环比较两个链表 

      如果l1小于l2，将l1加入新链表，指针后移；
      如果l1大于l2，将l2加入新链表，指针后移；

    3. 比较结束后，判断l1、l2的是否为空

      如果两个链表长度不一致，会存在一个不为空的情况。

      如果l1不为空，将l1追加到新链表；
      如果l2不为空，将l2追加到新链表；

  递归实现

    1. 比较l1和l2值大小

      如果l1的值小于l2的值，将l1的next与剩余元素合并;
      如果l1的值大于l2的值，将l2的next与剩余元素合并;

    2. 判断边界情况

      如果l1和l2是空链表，只需要直接返回非空链表;

    3. 递归，直到两个链表其中一个为空


#### 3. 代码实现

  循环实现

  ```js
  /**
   * @description 合并两个有序链表
   * @param {ListNode} l1 
   * @param {ListNode} l2
   * @return {ListNode}
   */
  var mergeTwoLists = function(l1, l2) {
    let curr = new ListNode();

    let dummy = curr;

    while (l1 !== null && l2 !== null) {
      if (l1.val < l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }

    if (l1 !== null) {
      curr.next = l1;
    }
    if (l2 !== null) {
      curr.next = l2;
    }

    return dummy.next;
  };
  ```

  递归实现

  ```js
  /**
   * @description 合并两个有序链表
   * @param {ListNode} l1 
   * @param {ListNode} l2
   * @return {ListNode}
   */
  var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
      return l2;
    } else if (l2 === null) {
      return l1;
    } else if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
    } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
    }
  };
  ```