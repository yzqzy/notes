function insertionSort (arr, n) {
  if (n <= 1) return;

  for (let i = 1; i < n; i++) {
    const tmp = arr[i];
    
    let j = i - 1;

    for (; j >= 0; j--) {
      if (arr[j] > tmp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }

    arr[j + 1] = tmp;
  }
}

const arr = [4, 5, 6, 1, 3, 2];

console.log(arr);
insertionSort(arr, arr.length);
console.log(arr);