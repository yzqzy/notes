### 无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

#### 1. 示例

  输入: "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

  输入: "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

  输入: "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

#### 2. 解题思路

  siding window 滑动窗口

  使用set

    1. 创建一个set

    2. 两个指针

      第一个指向字符串的开头 - j
      第二个随着for循环遍历字符串 - i
    
    3. 如果set里没有s[i]，说明目前为止还没有重复的字符串，把s[i]添加到set里，更新最大不重复字符串的数量

    4. 如果set里有s[i]，则从set里开始删除s[j]，并且递增j（++j），如此反复知道set里没有s[i]为止

    5. 重复步骤3和4，知道遍历完整个字符串

  使用数组

    1. 创建一个arr

    2. 判断s[i]是否在数组里

    3. 如果数组中存在s[i]，则剪切掉从开头到当前i+1的数组长度

    4. 如果不在数组中，添加到数组

    5. 与数组长度进行比较，更新最大不重复字符串的数量

#### 3. 代码实现

  set解法

  ```js
  /**
   * @description 无重复字符的最长子串
   * @param {string} s
   * @return {number}
   */
  var lengthOfLongestSubstring = function (s) {
    const set = new Set();

    let i = 0,
        j = 0,
        maxLength = 0;

    if (s.length === 0) {
      return 0;
    }

    for (i; i < s.length; i++) {
      if (!set.has(s[i])) {
        set.add(s[i]);
        maxLength = Math.max(maxLength, set.size);
      } else {
        while (set.has(s[i])) {
          set.delete(s[j]);
          j++;
        }

        set.add(s[i]);
      }
    }

    return maxLength;
  };
  ```

  array解法

  ```js
  /**
   * @description 无重复字符的最长子串
   * @param {string} s
   * @return {number}
   */
  var lengthOfLongestSubstring = function (s) {
    let arr = [],
        maxLength = 0;
        
    if (s.length === 0) {
      return 0;
    }

    for (let i = 0; i < s.length; i++) {
      let index = arr.indexOf(s[i]);

      if (index !== -1) {
        arr.splice(0, index + 1);
      } 
      
      arr.push(s[i]);
      maxLength = Math.max(arr.length, maxLength);
    }

    return maxLength;
  };
  ```