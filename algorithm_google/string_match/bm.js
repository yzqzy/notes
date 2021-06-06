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

function bm (a, n, b, m) {
  const bc = new Array(SIZE); // 记录模式串每个字符最后出现位置

  generateBC(b, m, bc); // 构建坏字符哈希表

  let i = 0; // 表示主串与模式串对齐的第一个字符

  while (i < n - m) {
    let j;

    // 模式串从后往前匹配
    for (j = m - 1; j >= 0; j--) {
      if (a[i + j] != b[j]) break; // 坏字符对应模式串中的下标是 j
    }

    if (j < 0) {
      return i; // 匹配成功，返回主串与模式串第一个匹配的字符的位置
    }


    // 这里等同于将模式串往后滑动 j - bc(a[i + j].carCodeAt()) 位
    i = i + (j - bc[a[i + j].charCodeAt()]);
  }

  return -1;
}

