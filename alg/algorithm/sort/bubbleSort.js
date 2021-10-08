Array.prototype.bubbleSort = function () {
  const arr = this;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

const arr = [5, 4, 3, 2, 1];

arr.bubbleSort();

console.log(arr);