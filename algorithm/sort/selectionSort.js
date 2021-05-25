Array.prototype.selectionSort = function () {
  const arr = this;

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
}

const arr = [5, 4, 3, 2, 1];

arr.selectionSort();

console.log(arr);