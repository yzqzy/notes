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