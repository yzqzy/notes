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

## day08

### 验证二叉搜索树

[https://leetcode.cn/problems/validate-binary-search-tree/](https://leetcode.cn/problems/validate-binary-search-tree/)

```typescript
function isValidBST(root: TreeNode | null): boolean {
  return helper(root, -Infinity, +Infinity)
}

function helper(root: TreeNode, lower: number, upper: number) {
  if (!root) return true

  if (root.val <= lower || root.val >= upper) return false

  return helper(root.left, lower, root.val) &&  helper(root.right, root.val, upper)
}
```

```typescript
function isValidBST(root: TreeNode | null): boolean {
  const stack = []

  let value = -Infinity

  while (stack.length || root) {
    while (root) {
      stack.push(root)
      root = root.left
    }

    root = stack.pop()

    if (root.val <= value) return false
    value = root.val

    root = root.right
  }

  return true
}
```

### 二叉搜索树的最近公共祖先

[https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```typescript
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  }
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  }
  return root
}
```

```typescript
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right
    } else {
      break
    }
  }
  return root
}
```

## day09

### 图像渲染

[https://leetcode.cn/problems/flood-fill/](https://leetcode.cn/problems/flood-fill/)

```js
function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
  if (!image.length) return []

  const m = image.length
  const n = image[0].length
  const d = [[0, 1], [1, 0], [0, -1], [-1, 0]]

  const currentColor = image[sr][sc]

  const queue = [[sr, sc]]

  while (queue.length) {
    const [i, j] = queue.shift()

    if (image[i][j] !== currentColor || image[i][j] === newColor) continue

    image[i][j] = newColor

    for (const [dx, dy] of d) {
      const x = dx + i
      const y = dy + j

      if (x >= 0 && x < m && y >= 0 && y < n) queue.push([x, y])
    }
  }

  return image
}
```

```typescript
function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
  if (!image.length) return []

  const m = image.length
  const n = image[0].length
  const d = [[0, 1], [1, 0], [0, -1], [-1, 0]]

  const currentColor = image[sr][sc]

  const fill = (i: number, j: number) => {
    if (image[i][j] !== currentColor || image[i][j] === newColor) return

    image[i][j] = newColor

     for (const [dx, dy] of d) {
      const x = dx + i
      const y = dy + j

      if (x >= 0 && x < m && y >= 0 && y < n) fill(x, y)
    }
  }

  fill(sr, sc)

  return image
}
```

### 岛屿数量

[https://leetcode.cn/problems/number-of-islands/](https://leetcode.cn/problems/number-of-islands/)


```typescript
function numIslands(grid: string[][]): number {
  const m = grid.length
  const n = grid[0].length
  const d = [[0, 1], [1, 0], [0, -1], [-1, 0]]

  let count = 0

  const turnZero = (i: number, j: number) =>　{
    if (
      i < 0 || i >= m ||
      j < 0 || j >= n || 
      grid[i][j] === '0'
    ) return

    grid[i][j] = '0'

    d.forEach(([dx, dy]) => turnZero(dx + i, dy + j))
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++
        turnZero(i, j)      
      }
    }
  }

  return count
}
```

## day10

### 斐波那契数

[https://leetcode.cn/problems/fibonacci-number/](https://leetcode.cn/problems/fibonacci-number/)

```typescript
function fib(n: number): number {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}
```

```typescript
function fib(n: number): number {
  return helper(n, [])
}

function helper(n: number, memo: number[]) {
  if (n < 2) return n

  if (!memo[n]) {
    memo[n] = helper(n - 1, memo) + helper(n - 2, memo)
  }

  return  memo[n]
}
```

```typescript
function fib(n: number): number {
  if (n < 2) return n

  const dp = [0, 1]

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}
```

```typescript
function fib(n: number): number {
  if (n < 2) return n

  let n1 = 0
  let n2 = 1

  let result: number

  for (let i = 2; i <= n; i++) {
    result = n1 + n2

    n1 = n2
    n2 = result
  }

  return n2
}
```

### 爬楼梯

[https://leetcode.cn/problems/climbing-stairs/](https://leetcode.cn/problems/climbing-stairs/)


```typescript
function climbStairs(n: number): number {
  return helper(n, [])
}

function helper (n: number, memo: number[]) {
  if (n <= 2) return n

  if (!memo[n]) {
    memo[n] = helper(n - 1, memo) + helper(n - 2, memo)
  }

  return memo[n]
}
```

```typescript
function climbStairs(n: number): number {
  if (n <= 2) return n

  const dp = [1, 1]

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}
```

```typescript
function climbStairs(n: number): number {
  if (n <= 2) return n

  let n1 = 1
  let n2 = 1

  let result: number

  for (let i = 2; i <= n; i++) {
    result = n1 + n2

    n1 = n2
    n2 = result
  }

  return n2
}
```

## day11

### 使用最小花费爬楼梯

[https://leetcode.cn/problems/min-cost-climbing-stairs/](https://leetcode.cn/problems/min-cost-climbing-stairs/)

```typescript
function minCostClimbingStairs(cost: number[]): number {
  const n = cost.length

  let n1 = 0
  let n2 = 0

  let result: number

  for (let i = 2; i <= n; i++) {
    result = Math.min(n2 + cost[i - 1], n1 + cost[i - 2])

    n1 = n2
    n2 = result
  }

  return n2
}
```

### 不同路径

[https://leetcode.cn/problems/unique-paths/](https://leetcode.cn/problems/unique-paths/)

```typescript
function uniquePaths(m: number, n: number): number {
 const dp = Array.from({ length: m }, () => new Array(n).fill(0))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 || j == 0) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }

  return dp[m - 1][n - 1]
}
```

## day12

### 找到字符串中所有字母异位词

[https://leetcode.cn/problems/find-all-anagrams-in-a-string/](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

```typescript
function findAnagrams(s: string, p: string): number[] {
  const sLen = s.length
  const pLen = p.length

  if (sLen < pLen) return []

  const ans = []
  const sCount = new Array(26).fill(0)
  const pCount = new Array(26).fill(0)

  for (let i = 0; i < pLen; i++) {
    sCount[helper(s[i])]++
    pCount[helper(p[i])]++
  }

  if (isEqual(sCount, pCount)) ans.push(0)

  for (let i = 0; i < sLen - pLen; i++) {
    sCount[helper(s[i])]--
    sCount[helper(s[i + pLen])]++

    if (isEqual(sCount, pCount)) ans.push(i + 1)
  }

  return ans
}

function isEqual(sCount: number[], pCount: number[]) {
  if (sCount.toString() === pCount.toString()) return true
}

function helper(char: string) {
  return char.charCodeAt(0) - 'a'.charCodeAt(0)
}
```

### 替换后的最长重复字符

[https://leetcode.cn/problems/longest-repeating-character-replacement/](https://leetcode.cn/problems/longest-repeating-character-replacement/)

```typescript
function characterReplacement(s: string, k: number): number {
  const nums = new Array(26).fill(0)
  const n = s.length

  let left = 0
  let right = 0 

  let max = 0

  while (right < n) {
    nums[helper(s[right])]++
    max = Math.max(max, nums[helper(s[right])])

    if (right - left + 1 - max > k) {
      nums[helper(s[left])]--
      left++
    }

    right++
  }

  return right - left
}

function helper(char: string) {
  return char.charCodeAt(0) - 'A'.charCodeAt(0)
}
```

## day13

### 两数之和

[https://leetcode.cn/problems/two-sum/](https://leetcode.cn/problems/two-sum/)

```typescript
function twoSum(nums: number[], target: number): number[] {
  const cached = new Map()
  const len = nums.length

  let curr: number

  for (let i = 0; i < len; i++) {
    curr = target - nums[i]

    if (cached.has(curr)) {
      return [cached.get(curr), i]
    } 

    cached.set(nums[i], i)
  }

  return []
}
```

### 猜数字游戏

[https://leetcode.cn/problems/bulls-and-cows/](https://leetcode.cn/problems/bulls-and-cows/)

```typescript
function getHint(secret: string, guess: string): string {
  const s = new Array(10).fill(0)
  const g = new Array(10).fill(0)

  let bulls = 0

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] == guess[i]) {
      bulls++
    } else {
      s[helper(secret[i])]++
      g[helper(guess[i])]++
    }
  }

  let cows = 0

  for (let i = 0; i < 10; i++) {
    cows += Math.min(s[i], g[i])
  }

  return `${ bulls }A${ cows }B`
}

function helper(char: string) {
  return char.charCodeAt(0) - '0'.charCodeAt(0)
}
```

## day14

### 比较含退格的字符串

[https://leetcode.cn/problems/backspace-string-compare/solution/bi-jiao-han-tui-ge-de-zi-fu-chuan-by-leetcode-solu/](https://leetcode.cn/problems/backspace-string-compare/solution/bi-jiao-han-tui-ge-de-zi-fu-chuan-by-leetcode-solu/)

```typescript
function backspaceCompare(s: string, t: string): boolean {
  return helper(s) === helper(t)
}

function helper(str: string) {
  const stack = []

  for (let i = 0; i < str.length; i++) {
    if (str[i] == '#') {
      stack.pop()
    } else {
      stack.push(str[i])
    }
  }

  return stack.join('')
}
```

```typescript
function backspaceCompare(s: string, t: string): boolean {
  let i = s.length - 1
  let j = t.length - 1

  let skip: number

  while (i >= 0 || j >= 0) {
    skip = 0
    while (i >= 0) {
      if (s[i] === '#') {
        skip++
        i--
      } else  if (skip > 0){
        skip--
        i--
      } else {
        break
      }
    }

    skip = 0
    while (j >= 0) {
      if (t[j] === '#') {
        skip++
        j--
      } else if (skip > 0){
        skip--
        j--
      } else {
        break
      }
    }

    if (s[i] !== t[j]) return false

    i--
    j--
  }

  return true
}
```

### 字符串解码

[https://leetcode.cn/problems/decode-string/](https://leetcode.cn/problems/decode-string/)

```typescript
function decodeString(s: string): string {
  const stack = []

  let str = ''
  let count = ''

  for (const char of s) {
    if (char === '[') {
      stack.push('[')
    } else if (char === ']') {
      while(true) {
        const temp = stack.pop()
        if (temp === '[') break
        str = temp + str
      }
      while (true) {
        const temp = stack.pop()
        if (isNaN(+temp)) {
          stack.push(temp)
          break
        }
        count = temp + count
      }

      stack.push(str.repeat(+count))
      str = ''
      count = ''
    } else {
      stack.push(char)
    }
  }

  return stack.join('')
}
```

## day15

### 最后一块石头的重量

[https://leetcode.cn/problems/last-stone-weight/](https://leetcode.cn/problems/last-stone-weight/)

```typescript
function lastStoneWeight(stones: number[]): number {
  stones.sort((a, b) => b - a)

  const insert = (num: number): void => {
    let left = 0
    let right = stones.length - 1

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)

      if (stones[mid] > num) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    stones.splice(right + 1, 0, num)
  }

  while (stones.length > 1) {
    const m = stones.shift()
    const n = stones.shift()

    if (m === n) continue
    
    insert(Math.abs(m - n))
  }

  return stones.length > 0 ? stones[0] : 0
}
```

```typescript
function lastStoneWeight(stones: number[]): number {
  const heap = new BinaryHeap<number>((a, b) => b - a)

  for (const stone of stones) {
    heap.insert(stone)
  }

  while (heap.size() > 1) {
    const a = heap.pop()
    const b = heap.pop()

    console.log(a, b, heap)

    if (a > b) {
      heap.insert(a - b)
    }
  }

  return heap.size() ? heap.pop() : 0
}

type Compare<T> = (...args: T[]) => number

class BinaryHeap<T> {
  data:T[]
  compare: Compare<T>

  constructor (compare: Compare<T>) {
    this.data = [];
    this.compare = compare;
  }

  private swap (i1: number, i2: number) {
    [this.data[i1], this.data[i2]] = [this.data[i2], this.data[i1]];
  }

  private getParentIndex (i: number) {
    return (i - 1) >> 1;
  }

  private getLeftIndex (i: number) {
    return i * 2 + 1;
  }
  
  private getRightIndex (i: number) {
    return i * 2 + 2;
  }

  private heapifyUp (curIdx: number) {
    if (curIdx == 0) return;

    const parentIdx = this.getParentIndex(curIdx);

    if (this.data[parentIdx] && this.compare(this.data[curIdx], this.data[parentIdx]) < 0) {
      this.swap(parentIdx, curIdx);
      this.heapifyUp(parentIdx);
    }
  }

  private heapifyDown (curIdx: number) {
    const leftIdx = this.getLeftIndex(curIdx),
          rightIdx = this.getRightIndex(curIdx);

    if (this.data[leftIdx] && this.compare(this.data[leftIdx], this.data[curIdx]) < 0) {
      this.swap(leftIdx, curIdx);
      this.heapifyDown(leftIdx);
    }
    if (this.data[rightIdx] && this.compare(this.data[rightIdx], this.data[curIdx]) < 0) {
      this.swap(rightIdx, curIdx);
      this.heapifyDown(rightIdx);
    }
  }

  insert (val: T) {
    this.data.push(val);
    this.heapifyUp(this.size() - 1);
  }

  pop () {
    const value = this.data[0]
    const last = this.data.pop()
    if (this.size()) {
      this.data[0] = last;
      this.heapifyDown(0);
    }
    return value
  }

  peek () {
    return this.data[0];
  }

  size () {
    return this.data.length;
  }
}
```

### 前K个高频单词

[https://leetcode.cn/problems/top-k-frequent-words/](https://leetcode.cn/problems/top-k-frequent-words/)

```typescript

```
