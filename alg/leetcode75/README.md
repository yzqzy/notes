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
// 双指针

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
};
```

## day03

