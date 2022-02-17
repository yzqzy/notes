const merge = (p, r, q) => {
  let  i = p,
       j = q + 1,
       k = 0;

  const tmp = new Array(r - p + 1);

  while (i <= q && j <= r) {
    if (arr[i] <= arr[j]) {
      tmp[k++] = arr[i++];
    } else {
      tmp[k++] = arr[j++];
    }
  }

  let start = i,
      end = q;

  if (j <= r) {
    start = j;
    end = r;
  }
    
  while (start <= end) {
    tmp[k++] = arr[start++];
  }

  for (i = 0; i <= r - p; i++) {
    arr[p + i] = tmp[i];
  }
}

function mergeSort (arr, n) {
  const next = (arr, p, r) => {
    if (p >= r) return;
    
    const q = Math.floor(p + (r - p) / 2);

    console.log(p, r, q);
    
    next(arr, p, q);
    next(arr, q + 1, r);

    merge(p, r, q);
  }

  next(arr, 0, n - 1);
}

const arr = [3, 5, 4, 1, 2, 6];

console.log(arr);
mergeSort(arr, arr.length);
console.log(arr);