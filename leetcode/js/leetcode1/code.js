/**
 * @description 两数之和
 * @param {array} nums
 * @param {number} target
 * @return {array}
 */
var twoSum = function (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const result = target - nums[i];

    if (map.has(result)) {
      return [map.get(result), i];
    }

    map.set(nums[i], i);
  }

  return [];
};

/**
 * @description 两数之和
 * @param {array} nums
 * @param {number} target
 * @return {array}
 */
var twoSum = function (nums, target) {
  let obj = {};

  for (let i = 0; i < nums.length; i++) {
    const result = target - nums[i];

    if (obj[result] != undefined) {
      return [obj[result], i];
    }

    obj[nums[i]] = i;
  }

  return [];
};