###  爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

#### 1. 示例

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

#### 2. 解题思路

  memo[i-2] 3
  memo[i-1] 5
  memo[i] = memo[i-2] + memo[i-1]

  第n个楼梯的爬法等于n-1和n-2爬法的总和。

#### 3. 代码实现

```js
/**
 * @description 爬楼梯
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const memo = [];

  memo[1] = 1;
  memo[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 2] + memo[i - 1];
  }

  return memo[n];
};
```