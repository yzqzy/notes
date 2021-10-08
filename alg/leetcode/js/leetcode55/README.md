### 跳跃游戏

给定一个非负整数数组，你最初位于数组的第一个位置。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个位置。

#### 1. 示例

  输入: [2,3,1,1,4]
  输出: true
  解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。

  输入: [3,2,1,0,4]
  输出: false
  解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。

#### 2. 解题思路

  （1）动态规划 top down

    [3, 1, 0, 2, 4]

  0-未知 1-不通 -1-不通

  |3|1|0|2|4|
  |-|-|-|-|-|
  |0|0|0|0|1|
  |1|-1|-1|1|1|

  ```js
  /**
   * @description 跳跃游戏 - top down
   * @param {number[]} nums
   * @return {boolean}
   */
  var canJump = function (nums) {
    const totalLen = nums.length,
          memo = Array(totalLen).fill(0);

    memo[totalLen - 1] = 1;

    function _jump (position) {
      if (memo[position] === 1) {
        return true;
      } else if (memo[position] === -1) {
        return false;
      }

      const maxJump = Math.min(position + nums[position], totalLen - 1);

      for (let i = position + 1; i <= maxJump; i++) {
        const jumpResult = _jump(i);

        if (jumpResult === true) {
          memo[position] = 1;
          return true;
        }
      }

      memo[position] = -1;
      return false;
    }

    let result = _jump(0);
    return result;
  };
  ```

  （2）动态规划 bottom up

    [3, 1, 0, 2, 4]

  0-未知 1-不通 -1-不通

  |3|1|0|2|4|
  |-|-|-|-|-|
  |0|0|0|0|1|
  |1|-1|-1|1|1|

  ```js
  /**
   * @description 跳跃游戏 - bottom up
   * @param {number[]} nums
   * @return {boolean}
   */
  var canJump = function (nums) {
    const totalLen = nums.length,
          memo = Array(totalLen).fill(0);

    memo[totalLen - 1] = 1;

    for (let i = totalLen - 2; i >= 0; i--) {
      const maxJump = Math.min(i + nums[i], totalLen - 1);

      for (let j = i + 1; j <= maxJump; j++) {
        if (memo[j] === 1) {
          memo[i] = 1;
          break;
        }
      }
    }

    if (memo[0] === 1) {
      return true;
    } else {
      return false;
    }
  };
  ```

  （3）贪心算法

  ```js
  /**
   * @description 跳跃游戏 - 贪心算法
   * @param {number[]} nums
   * @return {boolean}
   */
  var canJump = function (nums) {
    let maxJump = nums.length - 1;

    for (let i = nums.length -1; i >= 0; i--) {
      if (i + nums[i] >= maxJump) {
        maxJump = i;
      }
    }

    return maxJump === 0;
  };
  ```