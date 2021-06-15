let num = 0;

function count (a, n) {
  num = 0;
  mergeSortCounting(a, 0, n - 1);
  return num;
}

function mergeSortCounting (a, p, r) {
  if (p > r) return;

  let q = Math.floor((p + r) / 2);

  mergeSortCounting(a, p, q);
  mergeSortCounting(a, q + 1, r);
  merge(q, p, q, r);
}

function merge (a, p, q, r) {
  let i = p,
      j = q + 1,
      k = 0;

  const tmp = new Array(r - p + 1);

  while (i <= q && j <= r) {
    if (a[i] <= a[j]) {
      tmp[k++] = a[i++];
    } else {
      num += (q - i + 1); // 统计 p - q 之间，比 a[j] 大的元素个数
      tmp[k++] = a[j++];
    }
  }

  while (i <= q) { // 处理剩下的
    tmp[k++] = a[j++];
  }
  while (j <= r) { // 处理剩下的
    tmp[k++] = a[j++];
  }

  for (let i = 0; i < r - p; i++) { // tmp 中拷贝回 a
    a[p + i] = tmp[i];
  }
}