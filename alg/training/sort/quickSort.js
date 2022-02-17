function partition (arr, start, end) {
  const pivot = end;

  let counter = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < arr[pivot]) {
      if (counter == i) {
        counter++;
      } else {
        const temp = arr[counter];
        arr[counter] = arr[i];
        arr[i] = temp;
        counter++;
      }
    }
  }

  const temp = arr[pivot];
  arr[pivot] = arr[counter];
  arr[counter] = temp;

  return counter;
}

function quickSort (arr, begin, end) {
  if (end < begin) return;

  const pivot = partition(arr, begin, end);

  quickSort(arr, begin, pivot - 1);
  quickSort(arr, pivot + 1, end);
}


const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
quickSort(arr, 0, arr.length - 1);
console.log(arr);
