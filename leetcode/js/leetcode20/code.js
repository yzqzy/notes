/**
 * @description 检测有序的序号
 * @param {string} s 
 * @return {boolean}
 */
var isValid = function (s) {
  const mappings = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}']
  ]);

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (mappings.get(s[i])) {
      stack.push(mappings.get(s[i]));
    } else {
      if (stack.pop() !== s[i]) {
        return false;
      }
    }
  }

  if (stack.length != 0) {
    return false;
  }

  return true;
};