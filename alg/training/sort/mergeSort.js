function merge (arr, left, mid, right) {
  const temp = new Array(right - left + 1);

  let i = left,
      j = mid + 1,
      k = 0;

  while (i <= mid && j <= right) {
    temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
  }

  while (i <= mid) temp[k++] = arr[i++];
  while (j <= right) temp[k++] = arr[j++];

  for (i = 0; i < temp.length; i++) {
    arr[left + i] = temp[i];
  }
}

function mergeSort (arr, left, right) {
  if (right <= left) return;

  const mid = (left + right) >> 1;

  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);

  merge(arr, left, mid, right);
}


const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
