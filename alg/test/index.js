/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
  const _getArea = (i, j) => {
    return (j - i) * Math.min(height[i], height[j]);
  }

  let max = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      max = Math.max(_getArea(i, j), max);
    }
  }

  return max;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));

