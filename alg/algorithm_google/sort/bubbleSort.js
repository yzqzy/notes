function bubbleSort (arr, n) {
  if (n <= 1) return;

  for (let i = 0; i < n; i++) {
    let flag = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];

        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;

        flag = true;
      }
    }

    if (!flag) break;
  }
}

const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
bubbleSort(arr, arr.length);
console.log(arr);