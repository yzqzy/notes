const SIZE = 256;

function generateBC(b, m, bc) {
  for (let i = 0; i < SIZE; i++) {
    bc[i] = -1;
  }
  
  for (let i = 0; i < m; i++) {
    const ascii = b[i].charCodeAt();
    bc[ascii] = i;
  }
}

/**
 * @param {array} b 
 * @param {number} m 
 * @param {array} suffix 
 * @param {array} prefix 
 */
 function generateGS (b, m, suffix, prefix) {
  for (let i = 0; i < m; i++) {
    suffix[i] = -1;
    prefix[i] = false;
  }

  for (let i = 0; i < m - 1; i++) {
    let j = i;
    let k = 0; // 公共后缀子串长度

    // 与 b [0, m - 1] 求公共后缀子串
    while (j >= 0 && b[j] === b[m - 1 - k]) {
      j--;
      k++;
      suffix[k] = j + 1; // j + 1 表示公共后缀子串在 b [0, i] 中的起始下标
    }

    if (j == -1) {
      prefix[k] = true; // 如果公共后缀子串也是模式串的前缀子串
    }
  }
}

function moveByGs (j, m, suffix, prefix) {
  let k = m - 1 - j;

  if (suffix[k] != -1) {
    j - suffix[k] + 1;
    return;
  }

  for (let r = j + 2; r <= m -1; r++) {
    if (prefix[m - r]) {
      return r;
    }
  }

  return m;
}

function bm (a, n, b, m) {
  const bc = new Array(SIZE); // 记录模式串每个字符最后出现位置

  generateBC(b, m, bc); // 构建坏字符哈希表

  const suffix = new Array(m);
  const prefix = new Array(m);

  generateGS(b, m, suffix, prefix);

  let i = 0; // 表示主串与模式串对齐的第一个字符

  while (i <= n - m) {
    let j;

    // 模式串从后往前匹配
    for (j = m - 1; j >= 0; j--) {
      if (a[i + j] != b[j]) break; // 坏字符对应模式串中的下标是 j
    }

    if (j < 0) {
      return i; // 匹配成功，返回主串与模式串第一个匹配的字符的位置
    }

    const x = j - bc[a[i + j].charCodeAt()];
    let y = 0;

    // 如果存在好后缀
    if (j < m - 1) {
      y = moveByGs(j, m, suffix, prefix);
    }

    i = i + Math.max(x, y);
  }

  return -1;
}

const str = 'abdassszaasasas';
const matchStr = 'sz';

console.time();
console.log(bm(str, str.length, matchStr, matchStr.length));
console.timeEnd();

console.time();
console.log(str.indexOf(matchStr));
console.timeEnd();