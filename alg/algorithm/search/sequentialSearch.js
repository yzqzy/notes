Array.prototype.sequmentialSearch = function (target) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === target) {
      return i;
    }
  }
  return -1;
};

const res = [1, 2, 3, 4, 5].sequmentialSearch(3);

console.log(res);