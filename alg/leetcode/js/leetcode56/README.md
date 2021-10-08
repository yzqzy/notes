### 合并区间

给出一个区间的集合，请合并所有重叠的区间。

#### 1. 示例

输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。

#### 2. 解题思路

  1. 将数组内的区间按照起始位置排序。
  2. 用curr数组记录当前合并的最大区间，遍历数组中的每一个区间。
     如果当前区间的起始位置小于或者等于curr的终点位置，则继续合并，并更新curr的起始位置和终止位置。
     如果当前区间的起始位置大于curr的终止位置，则无法合并，将curr加入到result中，并用当前的区间替换curr的值。

#### 3. 代码实现

```js
/**
 * @description 合并区间
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  if (intervals.length < 2) {
    return intervals;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  let curr = intervals[0],
      result = [];
  
  for (let interval of intervals) {
    if (curr[1] >= interval[0]) {
      curr[1] = Math.max(curr[1], interval[1]);
    } else {
      result.push(curr);
      curr = interval;
    }
  }

  if (curr.length !== 0) {
    result.push(curr);
  }

  return result;
};
```