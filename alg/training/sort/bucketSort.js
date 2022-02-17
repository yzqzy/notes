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

function bucketSort (arr, bucketSize) {
  if (arr.length === 0) return [];

  let i,
      minVal = arr[0],
      maxVal = arr[0];

  for (i = 1; i < arr.length; i++) {
    if (arr[i] < minVal) {
      minVal = arr[i];
    } else if (arr[i] > maxVal) {
      maxVal = arr[i];
    }
  }


  // 初始化桶
  bucketSize = bucketSize || 5;

  const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1,
        buckets = new Array(bucketCount);

  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }


  // 利用映射函数分配数据
  for (i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minVal) / bucketSize)].push(arr[i]);
  }


  arr.length = 0;
  
  for (i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]); // 桶排序，使用插入排序

    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]);
    }
  }
}


const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
bucketSort(arr, 6);
console.log(arr);
