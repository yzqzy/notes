function bubbleSort (arr) {
  const len = arr.length;

  let temp, finish;

  for (let i = 0; i < len - 1; i++) {
    finish = true;

    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;

        finish = false;
      }
    }

    if (finish) break;
  }

  return arr;
}

const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
bubbleSort(arr);
console.log(arr);
