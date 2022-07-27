const fs = require('fs');
const fp = require('lodash/fp');

class IO {
  static of (value) {
    return new IO(function () {
      return value;
    });
  }

  constructor (func) {
    this._value = func;
  }

  join () {
    return this._value();
  }

  map (func) {
    return new IO(fp.flowRight(func, this._value));
  }

  flatMap (func) {
    return this.map(func).join();
  }
}


const readFile = (filename) => new IO(() => fs.readFileSync(filename, 'utf-8'));

const print = (x) => new IO(() => {
  console.log(x);
  return x;
});


const ret = readFile('package.json')
              .map(fp.toUpper)
              .flatMap(print)
              .join();

console.log(ret);