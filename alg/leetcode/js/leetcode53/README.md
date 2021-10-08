### 最大子序和

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

#### 1. 示例

输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

#### 2. 解题思路
  
  1. 创建空数组，加入第一个元素（n）

  2. 比较n + (n+1)和n+1的大小

    （1）如果n + (n + 1)小于n+1，创建新数组，以n+1为子元素；
    （2）如果n + (n + 1)大于n+1，将n+1，添加到数组中；
    （3）更新最大值;
  
  3. 指针后移，直到遍历完数组

#### 3. 代码实现

```js
/**
 * @description 最大子序和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const memo = [];

  memo[0] = nums[0];
  
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    memo[i] = Math.max(nums[i] + memo[i - 1], nums[i]);
    max = Math.max(max, memo[i]);
  }

  return max;
};
```