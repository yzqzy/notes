### 最长回文子串

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

#### 1. 示例

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

输入: "cbbd"
输出: "bb"

#### 2. 解题思路

  中心扩散的思想。

1. 如果字符串小于2，直接返回原字符串

2. 定义两个变量
  
  一个start存储当前找到的最大回文字符串的起始位置;
  另一个maxLength记录字符串的长度（终止的位置是start + maxLength）;

3. 创建一个helper function，判断左边和右边是否越界，同时最左边的字符是否等于最右边的字符。

  如果以上3个条件都满足，则判断是否需要更新回文字符串的最大长度及最大字符串的起始位置。
  然后left--，right++，继续判断，知道不满足三个条件之一。

4. 遍历字符串，每个位置调用helper function两遍，每一遍检查i - 1，i + 1，第二遍检查i，i + 1

  为什么要检查两次？

    重新扩散的思想，两种情况都要判断。

    1. 奇数项 i - 1, i + 1

      b a b a d

    2. 偶数项 i，i + 1

      c a b b a d

#### 3. 代码实现

  ```js
  /**
   * @description 最长回文子串
   * @param {string} s
   * @return {string}
   */
  var longestPalindrome = function (s) {
    if (s.length < 2) {
      return s;
    }

    let start = 0,
        maxLength = 1;

    // [a, b, a]
    // 2 - 0 + 1 = 3
    function expandAroundCenter (left, right) {
      while (left >= 0 && right < s.length && s[left] === s[right]) {
        if (right - left + 1 > maxLength) {
          maxLength = right - left + 1;
          start = left;
        }

        left--;
        right++;
      }
    }

    for (let i = 0; i < s.length; i++) {
      expandAroundCenter(i - 1, i + 1);
      expandAroundCenter(i, i + 1);
    }

    return s.substring(start, start + maxLength);
  };
  ```