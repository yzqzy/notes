function selectionSort (arr) {
  const len = arr.length;
  let minIdx, temp;
  
  for (let i = 0; i < len - 1; i++) {
    minIdx = i;
    
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  
  return arr;
}

const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
selectionSort(arr);
console.log(arr);
