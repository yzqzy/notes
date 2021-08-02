const _ = require('lodash');

const arr = ['23', '8', '10'];

console.log(_.map(arr, parseInt)); // [ 23, NaN, 2 ]

// parseInt 第二个参数范围是 2-36
// parseInt('23', 0, arr);
// parseInt('8', 1, arr);
// parseInt('10', 2, arr);


const fp = require('lodash/fp');

console.log(fp.map(parseInt, arr)); // [ 23, 8, 10 ]