let obj = {
  start: [1, 2, 3, 4, 5],
  end: [7, 8, 9],
  [Symbol.iterator] () {
    let index = 0,
        arr = [...this.start, ...this.end],
        len = arr.length;

    return {
      next () {
        if (index < len) {
          return {
            value: arr[index++],
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}

var iter = obj[Symbol.iterator]();

console.log(iter.next());
console.log(iter.next()); 
console.log(iter.next());

for (let i of obj) {
  console.log(i);
}
// 1 2 3 4 5 6 7 8 9

console.log(...obj); // 1 2 3 4 5 6 7 8 9


