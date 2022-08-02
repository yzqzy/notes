# LeetCode 75

[https://leetcode.cn/study-plan/leetcode_75/](https://leetcode.cn/study-plan/leetcode_75/)

## day01

### 一维数组的动态和

[https://leetcode.cn/problems/running-sum-of-1d-array/](https://leetcode.cn/problems/running-sum-of-1d-array/)



```typescript
function runningSum(nums: number[]): number[] {
  const len = nums.length

  for (let i = 1; i < len; i++) {
    nums[i] += nums[i - 1]
  }
  
  return nums
}
```

### 寻找数组的中心下标

[https://leetcode.cn/problems/find-pivot-index/](https://leetcode.cn/problems/find-pivot-index/)

```typescript
function pivotIndex(nums: number[]): number {
  const total = nums.reduce((pre, cur) => pre + cur, 0)
  const len = nums.length

  let sum = 0

  for (let i = 0; i <　len; i++) {
    if (2 * sum + nums[i] === total) {
      return i
    }
    sum += nums[i]
  }
  
  return -1
}
```

## day02

### 同构字符串

[https://leetcode.cn/problems/isomorphic-strings/](https://leetcode.cn/problems/isomorphic-strings/)

```typescript
function isIsomorphic(s: string, t: string): boolean {
  const sMap = new Map<string, string>()
  const tMap = new Map<string, string>()
  const len = s.length

  for (let i = 0; i < len; i++) {
    const x = s[i]
    const y = t[i]

    if (
        sMap.has(x) && sMap.get(x) !== y || 
        tMap.has(y) && tMap.get(y) !== x
      ) {
      return false
    }

    sMap.set(x, y)
    tMap.set(y, x)
  }  

  return true
}
```

### 判断子序列

[https://leetcode.cn/problems/is-subsequence/](https://leetcode.cn/problems/is-subsequence/)

```js
function isSubsequence(s: string, t: string): boolean {
  const sLen = s.length
  const tLen = t.length

  let i = 0;
  let j = 0;

  while (i < sLen && j < tLen) {
    if (s[i] === t[j]) {
      i++
    }
    j++
  }

  return i == sLen
}
```

## day03

### 合并两个有序链表

[https://leetcode.cn/problems/merge-two-sorted-lists/](https://leetcode.cn/problems/merge-two-sorted-lists/)

```typescript
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode()

  let curr = dummy

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1
      list1 = list1.next
    } else {
      curr.next = list2
      list2 = list2.next
    }
    curr = curr.next
  }

  curr.next = list1 || list2

  return dummy.next
}
```

```typescript
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (list1 === null) return list2
  if (list2 === null) return list1

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  }

  list2.next = mergeTwoLists(list2.next, list1)
  return list2
}
```

### 反转链表

[https://leetcode.cn/problems/reverse-linked-list/](https://leetcode.cn/problems/reverse-linked-list/)


```typescript
function reverseList(head: ListNode | null): ListNode | null {
  let prev = null
  let curr = head

  while (curr) {
    const next = curr.next

    curr.next = prev
    prev = curr
    curr = next
  }

  return prev
}
```

<img src="./images/reverse.png" style="zoom: 80%" />


```typescript
function reverseList(head: ListNode | null): ListNode | null {
  if (head == null || head.next == null) {
    return head
  }

  const curr = reverseList(head.next)

  head.next.next = head
  head.next = null

  return curr
}
```

## day04

### 链表的中间节点

[https://leetcode.cn/problems/middle-of-the-linked-list/](https://leetcode.cn/problems/middle-of-the-linked-list/)

```typescript
function middleNode(head: ListNode | null): ListNode | null {
  let n = 0;
  let curr = head

  while (curr) {
    n++
    curr = curr.next
  }

  let k = 0;
  curr = head
  while(k < Math.trunc(n / 2)) {
    k++
    curr = curr.next
  }

  return curr
}
```

```js
function middleNode(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head
  
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }

  return slow
}
```

### 环形链表2

[https://leetcode.cn/problems/linked-list-cycle-ii/](https://leetcode.cn/problems/linked-list-cycle-ii/)

```js
function detectCycle(head: ListNode | null): ListNode | null {
  const visited = new Set()

  while (head) {
    if (visited.has(head)) return head
    visited.add(head)
    head = head.next
  }

  return null
}
```

```typescript
function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null) return null

  let slow = head
  let fast = head

  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next

    if (slow === fast) {
      fast = head

      while (fast !== slow) {
        fast = fast.next
        slow = slow.next
      }

      return fast
    }
  }

  return null
}
```

<img src="./images/cycle02.gif" />

## day05

### 买卖股票的最佳时机

[https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

```typescript
function maxProfit(prices: number[]): number {
  let min = Infinity
  let max = 0

  for (const price of prices) {
    min = Math.min(min, price)
    max = Math.max(max, price - min)
  }

  return max
}
```

### 最长回文串

[https://leetcode.cn/problems/longest-palindrome/](https://leetcode.cn/problems/longest-palindrome/)

```typescript
function longestPalindrome(s: string): number {
  const visited = new Set()

  let max = 0

  for (const key of s) {
    if (visited.has(key)) {
      visited.delete(key)
      max += 2
    } else {
      visited.add(key)
    }
  }

  return visited.size ? max + 1 : max
}
```

## day06

### N 叉树的前序遍历

[https://leetcode.cn/problems/n-ary-tree-preorder-traversal/](https://leetcode.cn/problems/n-ary-tree-preorder-traversal/)

```typescript
interface Node {
  val: number
  children: Node[]
}

function preorder(root: Node | null): number[] {
  const ans = []
  helper(root, ans)
  return ans
}

function helper(node: Node | null, ans: number[]) {
  if (!node) return
  ans.push(node.val)
  node.children.forEach(item => {
    helper(item, ans)
  })
}
```

```typescript
interface Node {
  val: number
  children: Node[]
}

function preorder(root: Node | null): number[] {
  if(!root) return []

  const ans = []

  const stack = [root]

  while (stack.length) {
    const node = stack.pop()

    ans.push(node.val)

    stack.push(...node.children.reverse())
  }

  return ans
}
```

### 二叉树的层序遍历

[https://leetcode.cn/problems/binary-tree-level-order-traversal/](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

```typescript
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []

  const ans = []

  const queue = [
    { 
      layer: 0,
      node: root
    }
  ]

  while (queue.length) {
    const { layer, node } = queue.shift()

    if (!ans[layer]) {
      ans[layer] = []
    }
    ans[layer].push(node.val)

    node.left && queue.push({
      layer: layer + 1,
      node: node.left
    })
    node.right && queue.push({
      layer: layer + 1,
      node: node.right
    })
  }

  return ans
}
```

```typescript
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []

  const ans = []
  const queue = [root]

  let len: number

  while (len = queue.length) {
    ans.push([])

    while (len--) {
      const n = queue.shift()

      ans[ans.length - 1].push(n.val)

      n.left && queue.push(n.left)
      n.right && queue.push(n.right)
    }
  }

  return ans
}
```

```typescript
function levelOrder(root: TreeNode | null): number[][] {
  const ans = []
  helper(root, 0, ans)
  return ans
}

function helper(node: TreeNode | null, l: number, ans: number[][]) {
  if (!node) return

  if (!ans[l]) ans[l] = []

  ans[l].push(node.val)

  node.left && helper(node.left, l + 1, ans)
  node.right && helper(node.right, l + 1, ans)
}
```

## day07

###  二分查找

https://leetcode.cn/problems/binary-search/

```typescript
function search(nums: number[], target: number): number {
  let start = 0
  let end = nums.length - 1

  while (start <= end) {
    const mid = start + Math.floor((end - start) / 2)
    const num = nums[mid]

    if (num < target) {
      start = mid + 1
    } else if (num > target) {
      end = mid - 1
    } else　{
      return mid
    }
  }

  return -1
}
```

### 第一个错误的版本

https://leetcode.cn/problems/first-bad-version/

```typescript
var solution = function(isBadVersion: any) {
  return function(n: number): number {
    let start = 1
    let end = n

    while (start <= end) {
      const mid = start + Math.floor((end - start) / 2)

      if (isBadVersion(mid)) {
        end = mid - 1
      } else  {
        start = mid + 1
      }
    }

    return start
  }
}
```
