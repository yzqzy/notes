### 螺旋矩阵

给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

#### 1. 示例

  输入:

  ```js
  [
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ]
  ]

  ```

  输出: 

  ```js
  [1, 2, 3, 6, 9, 8, 7, 4, 5]
  ```

  输入:

  ```js
  [
    [ 1, 2, 3, 4 ],
    [ 5, 6, 7, 8 ],
    [ 9, 10, 11, 12 ]
  ]
  ```

  输出: 

  ```js
  [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
  ```

#### 2. 解题思路

  1. 如果数组为空，返回空数组；
  2. 定义4个边界以及当前方向；
  3. 当左边界小于等于右边界，且上边界小于等于下边界时，执行while循环：
     按照右、下、左、上的顺序，依次将路径上的字符添加到结果里；
  4. while循环结束后，返回结果；

#### 3. 代码实现

```js
/**
 * @description 螺旋矩阵
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (matrix.length === 0) {
    return [];
  }

  let top = 0,
      bottom = matrix.length - 1,
      left = 0,
      right = matrix[0].length - 1;

  let direaction = 'right',
      result = [];

  while (left <= right && top <= bottom) {
    switch (direaction) {
      case 'right':
        for (let i = left; i <= right; i++) {
          result.push(matrix[top][i]);
        }
        top++;
        direaction = 'bottom';
        break;
      case 'bottom':
        for (let i = top; i <= bottom; i++) {
          result.push(matrix[i][right]);
        }
        right--;
        direaction = 'left';
        break;
      case 'left':
        for (let i = right; i >= left; i--) {
          result.push(matrix[bottom][i]);
        }
        bottom--;
        direaction = 'top';
        break;
      case 'top':
        for (let i = bottom; i >= top; i--) {
          result.push(matrix[i][left]);
        }
        left++;
        direaction = 'right';
        break;
    }
  }

  return result;
};
```