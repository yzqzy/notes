### 字母异位词分组

给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

#### 1. 示例

输入: ["eat", "tea", "tan", "ate", "nat", "bat"]

输出:

```js
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

说明：

  所有输入均为小写字母。
  不考虑答案输出的顺序。

#### 2. 解题思路

  排序

    将字母排序，判断字符串是否相等，然后再进行分组。

  统计排序

    1. 检查是否为空数组
    2. 建立一个长度为26的数组，起始值为0
    3. 遍历所有字符串，将字母的出现频率放到数组的对应位置里（利用ascii码）
    4. 遍历数组，按照相同字母出现频率进行分组归类（hashMap）
    5. 遍历map，将结果返回

#### 3. 代码实现

```js
/**
 * @description 字母异位词分组
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  if (strs.length === 0) {
    return [];
  }

  const map = new Map();

  for (const str of strs) {
    const characters = Array(26).fill(0);

    for (let i = 0; i < str.length; i++) {
      const ascii = str.charCodeAt(i) - 97;
      characters[ascii]++;
    }

    const key = characters.join('');

    if (map.has(key)) {
      map.set(key, [...map.get(key), str]);
    } else {
      map.set(key, [str]);
    }
  }

  return [...map.values()];
};
```