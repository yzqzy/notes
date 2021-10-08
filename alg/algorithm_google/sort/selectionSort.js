function selectionSort (arr, n) {
  if (n <= 1) return;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    const tmp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = tmp;
  }

}

const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
selectionSort(arr, arr.length);
console.log(arr);