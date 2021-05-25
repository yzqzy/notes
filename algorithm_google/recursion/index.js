const cache = new Map();

function f (n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  
  if (cache.has(n)) {
    return cache.get(n);
  }

  const ret = f(n - 1) + f(n - 2);
  cache.set(n, ret);
  
  return ret;
}

function f1 (n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  
  let ret = 0,
      pre = 2,
      prepre = 1;
  
  for (let i = 3; i <=n ; i++) {
    ret = pre + prepre;
    prepre = pre;
    pre = ret;
  }
  
  return ret;
}

console.time();
console.log(f(100))
console.timeEnd();