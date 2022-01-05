class BinaryHeap {
  constructor (compare) {
    this.data = [];
    this.compare = compare;
  }

  swap (i1, i2) {
    [this.data[i1], this.data[i2]] = [this.data[i2], this.data[i1]];
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

    if (this.data[parentIdx] && this.compare(this.data[curIdx], this.data[parentIdx]) < 0) {
      this.swap(parentIdx, curIdx);
      this.heapifyUp(parentIdx);
    }
  }

  heapifyDown (curIdx) {
    const leftIdx = this.getLeftIndex(curIdx),
          rightIdx = this.getRightIndex(curIdx);

    if (this.data[leftIdx] && this.compare(this.data[leftIdx], this.data[curIdx]) < 0) {
      this.swap(leftIdx, curIdx);
      this.heapifyDown(leftIdx);
    }
    if (this.data[rightIdx] && this.compare(this.data[rightIdx], this.data[curIdx]) < 0) {
      this.swap(rightIdx, curIdx);
      this.heapifyDown(rightIdx);
    }
  }

  insert (val) {
    this.data.push(val);
    this.heapifyUp(this.size() - 1);
  }

  pop () {
    this.data[0] = this.data.pop();
    this.heapifyDown(0);
    return this.data[0];
  }

  peek () {
    return this.data[0];
  }

  size () {
    return this.data.length;
  }
}