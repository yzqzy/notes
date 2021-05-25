Array.prototype.insertionSort = function () {
  const arr = this;
  
  for (var i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j = i;
  
    while (j > 0) {
      if (arr[j - 1] > temp) {
        arr[j] = arr[j - 1];
      } else {
        break;
      }
      j--;
    }
  
    arr[j] = temp;
  }
}

const arr = [5, 4, 3, 2, 1];

arr.insertionSort();

console.log(arr);