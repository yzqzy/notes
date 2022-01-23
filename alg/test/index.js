function fib (n, memo = {}) {
  if (n <= 2) return n;
  
  if (!memo[n]) {
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  }
  return memo[n];
};

function fib (n) {
  if (n <= 2) {
    return n;
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

console.log(fib(3));
console.log(fib(30));
console.log(fib(300));

// 0 1 1 2 3 5 8 13 21 34 55