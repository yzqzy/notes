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