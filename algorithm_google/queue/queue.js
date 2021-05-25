class ArrayQueue {
  items = null;
  n = 0;
  head = 0;
  tail = 0;

  constructor (capacity) {
    this.items = new Array(capacity);
    this.n = capacity;
  }

  enqueue (item) {
    if (this.tail === this.n) {
      if (this.head === 0) return false;

      for (let i = this.head; i < this.tail; i++) {
        this.items[ i - this.head] = this.items[i];
      }

      this.tail -= this.head;
      this.head = 0;
    };

    this.items[this.tail] = item;
    this.tail++;

    return true;
  }

  dequeue () {
    if (this.head === this.tail) return null;

    const ret = this.items[this.head];
    this.head++;

    return ret;
  }
}

class CircularQueue {
  items = null;
  n = 0;
  head = 0;
  tail = 0;

  constructor (capacity) {
    this.items = new Array(capacity);
    this.n = capacity;
  }

  enqueue (item) {
    if ((this.tail + 1) % this.n === this.head) return false;

    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % this.n;

    return true;
  }

  dequeue () {
    if (this.head === this.tail) return null;

    const ret = this.items[this.head];
    this.head = (this.head + 1) % this.n;

    return ret;
  }
}

module.exports = {
  ArrayQueue,
  CircularQueue
}