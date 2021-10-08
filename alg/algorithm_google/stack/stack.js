class ArrayStack {
  items;
  count;
  n;

  constructor (n) {
    this.items = new Array(n);
    this.n = n;
    this.count = 0;
  }

  push (item) {
    if (this.count == this.n) return false;

    this.items[this.count] = item;
    this.count++;

    return true;
  }

  pop () {
    if (this.count == 0) return null;

    const tmp = this.items[this.count - 1];
    this.count--;

    return tmp;
  }
}

module.exports = {
  ArrayStack
}