function bsearch (arr, n, val) {
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const mid  = Math.floor((low + high) / 2);

    if (arr[mid] == val) {
      return mid;
    } else if (arr[mid] < val) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

function bsearch (arr, low, high, val) {
  if (low > high) return -1;

  const mid = low + Math.floor((high - low) >> 1);

  if (arr[mid] == val) {
    return mid;
  } else if (arr[mid] < val) {
    return bsearch(arr, mid + 1, high, val);
  } else {
    return bsearch(arr, low, mid - 1, val);
  }
}

function bsearch (arr, n, val) {
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) >> 1);

    if (arr[mid] >= val) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return low < n && arr[low] == val ? low : -1;
}

function bsearch (arr, n, val) {
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) >> 1);

    if (arr[mid] > val) {
      high = mid - 1;
    } else if (arr[mid] < val) {
      low = mid + 1;
    } else {
      if ((mid == 0) || (arr[mid - 1] != val)) return mid;
      high = mid - 1;
    }
  }

  return -1;
}

function bsearch (arr, n, val) {
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) >> 1);

    if (arr[mid] > val) {
      high = mid - 1;
    } else if (arr[mid] < val) {
      low = mid + 1;
    } else {
      if ((mid ==  n - 1) || (arr[mid + 1] != val)) return mid;
      low = mid + 1;
    }
  }

  return -1;

}

function bsearch (arr, n, val) {
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) >> 1);

    if (arr[mid] >= val) {
      if ((mid == 0) || (arr[mid - 1] < val)) return mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1;
}

function bsearch (arr, n, val) {
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) >> 1);

    if (arr[mid] > val) {
      high = mid - 1;
    } else {
      if ((mid == n - 1) || (arr[mid + 1] > val)) return mid;
      low = mid + 1;
    }
  }

  return -1;
}

// const arr = [1, 2, 3, 7, 8, 12, 43, 67];
const arr = [1, 3, 4, 5, 6, 8, 8, 8, 8, 12, 43, 67];

console.time();
console.log(bsearch(arr, arr.length, 7))
// console.log(bsearch(arr, 0, arr.length - 1, 3))
console.timeEnd();