### 有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

  左括号必须用相同类型的右括号闭合。
  左括号必须以正确的顺序闭合。
  注意空字符串可被认为是有效字符串。

#### 1. 示例

  输入: "()"
  输出: true

  输入: "()[]{}"
  输出: true

  输入: "(]"
  输出: false

  输入: "([)]"
  输出: false

  输入: "{[]}"
  输出: true

#### 2. 解题思路

  1. 创建一个HashMap，把括号配对放进去

  2. 创建一个stack（array），for循环遍历字符串

    对于每一个字符，如果map里有这个key，那说明它是一个左括号，需要从map里取出相对应的右括号，把它push进stack里。
    否则的话，它就是右括号，需要pop出stack里的第一个字符串然后看它是否等于当前的字符。如果不相符，则返回false。

  3. 循环结束后，如果stack不为空，说明还剩一些左括号没有被闭合，返回false。否则返回true。

#### 3. 代码实现

```js
/**
 * @description 检测有序的序号
 * @param {string} s 
 * @return {boolean}
 */
var isValid = function(s) {
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
```