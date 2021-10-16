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