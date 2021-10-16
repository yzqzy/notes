function getNexts (b, m) {
  const next = new Array(m);

  next[0] = -1;

  let k = -1;

  for (let i = 1; i < m; i++) {
    while (k != -1 && b[k + 1] != b[i]) {
      k = next[k];
    }

    if (b[k + 1] == b[i]) {
      k++;
    }

    next[i] = k;
  }

  return next;
}

/**
 * 
 * @param {array} a - 主串
 * @param {number} n 
 * @param {array} b - 模式串
 * @param {number} m 
 */
function kmp (a, n, b, m) {
  const next = getNexts(b, m);

  let j = 0;

  for (let i = 0; i < n; i++) {
    // 一直找到 a[i] 和 b[j]
    while (j > 0 && a[i] != b[j]) {
      j = next[j - 1] + 1;
    }

    if (a[i] == b[j]) {
      j++;
    }

    // 找到匹配的模式串
    if (j == m) {
      return i - m + 1;
    }
  }

  return -1;
}

const str = 'abdassszaasasas';
const matchStr = 'bd';

console.time();
console.log(kmp(str, str.length, matchStr, matchStr.length));
console.timeEnd();