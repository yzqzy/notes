const partition = (arr, p, r) => {
  const pivot = arr[r];
  let i = p;

  for (let j = p; j < r; j++) {
    if (arr[j] < pivot) {
      if (i == j) {
        i++;
      } else {
        const tmp = arr[i];
        arr[i++] = arr[j];
        arr[j] = tmp;
      }
    }
  }

  const tmp = arr[i];
  arr[i] = arr[r];
  arr[r] = tmp;

  return i;
}

function quickSort (arr, n) {
  const next = (arr, p, r) => {
    if (p >= r) return;

    const q = partition(arr, p, r);
    
    next(arr, p, q - 1);
    next(arr, q + 1, r);
  }

  next(arr, 0, n - 1);
}

const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
quickSort(arr, arr.length);
console.log(arr);