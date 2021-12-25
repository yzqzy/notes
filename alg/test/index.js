/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var rotate = function(nums, k) {
  let res = [];

  for (let i = k; i < nums.length; i++) {
    res[nums.length] = nums[i];  
  }

  for (let j = 0; j < k; j ++) {
    res[res.length] = k;
  }

  return res;
};

let nums = [1,2,3,4,5,6,7], k = 3;

console.log(rotate(nums, k));

