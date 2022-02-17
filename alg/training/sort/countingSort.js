function countingSort (arr, maxVal) {
  const bucket = new Array(maxVal + 1);

  let sortedIndex = 0,
      arrLen = arr.length,
      bucketLen = bucket.length;

  for (let i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0;
    }
    bucket[arr[i]]++;
  }

  for (let j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex++] = j;
      bucket[j]--;
    }
  }
}

const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
countingSort(arr, 6);
console.log(arr);
