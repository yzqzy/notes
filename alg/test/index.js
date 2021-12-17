/**
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
  if (n == 1) {
    return 1;
  }

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
    let thrid = first + second;

    first = second;
    second = thrid;
  }

  return second;
};


console.log(climbStairs(44))