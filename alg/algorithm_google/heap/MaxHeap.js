class MaxHeap {
  a = [];
  n;
  count;

  constructor (capcity) {
    this.a = new Array(capcity + 1);
    this.n = capcity;
    this.count = 0;
  }

  getParentIndex (i) {
    return i >> 1;
  }

  getLeftIndex (i) {
    return i * 2;
  }

  getRightIndex (i) {
    return i * 2 + 1;
  }

  swap (arr, i1, i2) {
    const temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
  }

  insert (data) {
    if (this.count >= this.n) return;

    this.count++;

    this.a[this.count] = data;

    let i = this.count;

    const parentIdx = this.getParentIndex(i);
    
    while (parentIdx > 0 && this.a[i] > this.a[parentIdx]) {
      this.swap(this.a, i, parentIdx);
      i = parentIdx;
    }
  }

  heapify (a, n, i) {
    while (true) {
      let maxPos = i;

      const leftIdx = this.getLeftIndex(i);
      const rightIdx = this.getRightIndex(i);

      if (leftIdx <= n && a[maxPos] < a[leftIdx]) {
        maxPos = leftIdx;
      }

      if (rightIdx <= n && a[maxPos] < a[rightIdx]) {
        maxPos = rightIdx;
      }

      if (maxPos == i) {
        break;
      }

      this.swap(a, i, maxPos);

      i = maxPos;
    }
  }

  removeMax () {
    if (this.count === 0) return -1;

    this.a[1] = this.a[this.count];

    this.count--;

    this.heapify(this.a, this.count, 1);
  }

  build (a, n) {
    for (let i = n / 2; i >= 1; i--) {
      this.heapify(a, n, i);
    }
  }

  sort (a, n) {
    this.build(a, n);

    let k = n;

    while (k > 1) {
      this.swap(a, 1, k);
      k--;
      this.heapify(a, k, 1);
    }
  }
}

const heap = new MaxHeap(3);

heap.insert(3);
heap.insert(4);
heap.insert(8);
heap.insert(9);
heap.insert(10);

heap.removeMax();

heap.sort(heap.a, heap.n);

console.log(heap.a, heap.n, heap.count);