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