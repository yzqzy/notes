function insertionSort (arr) {
  const len = arr.length;
  let preIdx, current;

  for (let i = 1; i < len; i++) {
    preIdx = i - 1;
    current = arr[i];

    while (preIdx >= 0 && arr[preIdx] > current) {
      arr[preIdx + 1] = arr[preIdx];
      preIdx--;
    }

    arr[preIdx + 1] = current;
  }

  return arr;
}


const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
insertionSort(arr);
console.log(arr);
