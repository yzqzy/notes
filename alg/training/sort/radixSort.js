function radixSort (arr, maxDigit) {
  const counter = [];

  let mod = 10,
      dev = 1;

  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      const bucket = parseInt((arr[j] % mod) / dev);

      if (counter[bucket] == null) counter[bucket] = [];

      counter[bucket].push(arr[j]);
    }

    let pos = 0;

    for (let j = 0; j < counter.length; j++) {
      let val = null;

      if (counter[j]) {
        while ((val = counter[j].shift()) != null) {
          arr[pos++] = val;
        }
      }
    }
  }
}


const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
radixSort(arr, 6);
console.log(arr);
