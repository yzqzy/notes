class MaxHeap {
  a = [];
  n;
  count;

  constructor (capcity) {
    this.a = new Array(capcity + 1);
    this.n = capcity;
    this.count = 0;
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

    while (i / 2 > 0 && this.a[i] > this.a[i / 2]) {
      this.swap(this.a, i, i / 2);
      i = i / 2;
    }
  }

  
}

const heap = new MaxHeap(8);

heap.insert(1);
heap.insert(3);
heap.insert(5);
heap.insert(2);
heap.insert(6);
heap.insert(8);


console.log(heap);