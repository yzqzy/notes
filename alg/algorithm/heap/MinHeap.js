class MinHeap {
  constructor () {
    this.heap = [];
  }

  swap (i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }

  getParentIndex (i) {
    return (i - 1) >> 1;
  }

  getLeftIndex (i) {
    return i * 2 + 1;
  }

  getRightIndex (i) {
    return i * 2 + 2;
  }

  shiftUp (curIdx) {
    if (curIdx == 0) return;

    const parentIdx = this.getParentIndex(curIdx);

    if (this.heap[parentIdx] && this.heap[parentIdx].value > this.heap[curIdx].value) {
      this.swap(parentIdx, curIdx);
      this.shiftUp(parentIdx);
    }
  }

  shiftDown (curIdx) {
    const leftIdx = this.getLeftIndex(curIdx),
          rightIdx = this.getRightIndex(curIdx);

    if (this.heap[leftIdx] && this.heap[leftIdx].value < this.heap[curIdx].value) {
      this.swap(leftIdx, curIdx);
      this.shiftDown(leftIdx);
    }
    if (this.heap[rightIdx] && this.heap[rightIdx].value < this.heap[curIdx].value) {
      this.swap(rightIdx, curIdx);
      this.shiftDown(rightIdx);
    }
  }

  insert (val) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }

  pop () {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  peek () {
    return this.heap[0];
  }

  size () {
    return this.heap.length;
  }
}

const h = new MinHeap();

h.insert(3);
h.insert(2);
h.insert(1);

h.pop();