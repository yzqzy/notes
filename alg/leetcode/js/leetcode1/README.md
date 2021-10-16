### 两数之和

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

#### 1. 示例

  给定 nums = [2, 7, 11, 15], target = 9

  因为 nums[0] + nums[1] = 2 + 7 = 9，所以返回 [0, 1]。

#### 2. 解题思路

  1. 创建一个Map；
  2. for循环遍历数组；
  3. 用target减去nums[i]，计算哪个数能跟当前的数字相加得到target；
  4. 检查map中有没有这个数；
    
    如果有则返回结果，如果没有则把num[i]当作key，i当作value放入到map中。

  JavaScript中，也可以用对象替代map进行数据缓存。

#### 3. 代码实现

  map实现

  ```js
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
  ```

  js对象实现

  ```js
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
  ```