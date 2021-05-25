function countingSort (arr, n) {
  if (n <= 1) return;

  let max = arr[0];

  for (let i = 1; i < n; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }

  const c = new Array(max + 1);

  for (let i = 0; i <= max; i++) {
    c[i] = 0;
  }

  for (let i = 0; i < n; i++) {
    c[arr[i]]++;
  }

  for (let i = 1; i <= max; i++) {
    c[i] = c[i - 1] + c[i];
  }

  const r = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    const idx = c[arr[i]] - 1;

    r[idx] = arr[i];
    c[arr[i]]--;
  }

  for (let i = 0; i < n; i++) {
    arr[i] = r[i];
  }
}

const arr = [2, 5, 3, 0, 2, 3, 0, 3];

console.log(arr);
countingSort(arr, arr.length);
console.log(arr);