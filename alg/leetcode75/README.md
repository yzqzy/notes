# LeetCode 75

https://leetcode.cn/study-plan/leetcode_75/

## day01

### 一维数组的动态和

https://leetcode.cn/problems/running-sum-of-1d-array/

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

https://leetcode.cn/problems/find-pivot-index/

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

https://leetcode.cn/problems/isomorphic-strings/

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

https://leetcode.cn/problems/is-subsequence/

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

https://leetcode.cn/problems/merge-two-sorted-lists/

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

https://leetcode.cn/problems/reverse-linked-list/

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
