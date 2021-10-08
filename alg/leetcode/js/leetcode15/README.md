### 三数之和

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

#### 1. 示例

给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

#### 2. 解题思路

 1. 给数组排序；

 2. 遍历数组，从0遍历到length-2；

    防止数组越界。

 3. 如果当前的数字等于前一个数字，则跳过这个数；

    数组去重。

 4. 如果数字不同，则设置start = i + 1, end = length - 1；

    查看i,start和end三个数的和比零大还是小，
    如果比0小，start++，如果比0大，end--,
    如果等于0，把这三个数加入到结果里。

  5. 返回结果

#### 3. 代码实现

  ```js
  /**
   * @description 三数之和
   * @param {array} s
   * @return {array}
   */
  var threeSum = function(nums) {
    const result = [];

    nums.sort(function (a, b) {
      return a - b;
    });

    for (let i = 0; i < nums.length - 2; i++) {
      // 边界判断、数组去重
      if (i === 0 || nums[i] !== nums[i - 1]) {
        let start = i + 1,
            end = nums.length - 1;

        while (start < end) {
          if (nums[i] + nums[start] + nums[end] === 0) {
            result.push([ nums[i], nums[start], nums[end] ]);

            start++;
            end--;

            // 数组去重
            while (start < end && nums[start] === nums[start - 1]) {
              start++;
            }
            while (start < end && nums[end] === nums[end + 1]) {
              end--;
            }
          } else if (nums[i] + nums[start] + nums[end] < 0) {
            start++;
          } else {
            end--;
          }
        }
      }
    }

    return result;
  };
  ```