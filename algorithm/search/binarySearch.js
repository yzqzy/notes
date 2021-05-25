Array.prototype.binarySearch = function (item) {
  let low = 0,
      high = this.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    const elem = this[mid];

    if (elem < item) {
      low = mid + 1;
    } else if (elem > item) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}

const res = [1, 2, 3, 4, 5].binarySearch(3);

console.log(res);