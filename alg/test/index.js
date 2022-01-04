class BinaryHeap {
  constructor (compare) {
    this.heap = [];
    this.compare = compare;
  }

  swap (i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
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

  heapifyUp (curIdx) {
    if (curIdx == 0) return;

    const parentIdx = this.getParentIndex(curIdx);

    if (this.compare(this.heap[curIdx], this.heap[parentIdx]) < 0) {
      this.swap(parentIdx, curIdx);
      this.heapifyUp(parentIdx);
    }
  }

  heapifyDown (curIdx) {
    const leftIdx = this.getLeftIndex(curIdx),
          rightIdx = this.getRightIndex(curIdx);

    if (this.compare(this.heap[leftIdx], this.heap[curIdx]) < 0) {
      this.swap(leftIdx, curIdx);
      this.heapifyDown(leftIdx);
    }
    if (this.compare(this.heap[rightIdx], this.heap[curIdx]) < 0) {
      this.swap(rightIdx, curIdx);
      this.heapifyDown(rightIdx);
    }
  }
  
  insert (val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  pop () {
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
  }

  peek () {
    return this.heap[0];
  }

  size () {
    return this.heap.length;
  }
}

const h = new BinaryHeap((a, b) => b - a);

h.insert(3);
h.insert(2);
h.insert(1);
h.insert(0);
h.insert(0);
h.insert(0);
h.insert(15);
h.insert(5);

h.pop();

console.log(h.heap)