// function * get () {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let g = get();

// console.log(g.next()); // { value: 1, done: false }
// console.log(g.return()); // { value: undefined, done: true }
// console.log(g.next()); // { value: undefined, done: true }


// function * get () {
//   yield 1;
//   return 10;
//   yield 2;
//   yield 3;
// }

// let g = get();

// console.log(g.next()); // { value: 1, done: false }
// console.log(g.next()); // { value: 10, done: true }
// console.log(g.next()); // { value: undefined, done: true }


// function * get () {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let g = get();

// console.log(g.next()); // { value: 1, done: false }
// console.log(g.return(10)); // { value: 10, done: true }
// console.log(g.next()); // { value: undefined, done: true }


// try {
//   setTimeout(() => {
//     console.log(a);
//   })
// } catch (error) {
//   console.log(error.message || error);
// }


// var g = function * () {
//   try {
//     yield;
//   } catch (error) {
//     console.log('inner ', error.message || e);
//   }
// }

// const i = g();
// console.log(i.throw('a'));
// console.log(i.next());
// // 报错

// var g = function * () {
//   try {
//     yield;
//   } catch (error) {
//     console.log('inner ', error.message || error);
//   }
// }

// const i = g();
// console.log(i.next()); // { value: undefined, done: false }
// // inner a
// console.log(i.throw('a')); // { value: undefined, done: true }


// var g = function * () {
//   yield 1;
//   try {
//     yield 2;
//   } catch (error) {
//     console.log('inner ', error.message || error);
//   }
//   yield 3;
// }

// const i = g();
// console.log(i.next()); // { value: 1, done: false }
// console.log(i.next()); // { value: 2, done: false }
// // inner b
// console.log(i.throw('b')); // { value: 3, done: false }
// console.log(i.next()); // { value: undefined, done: true }


// function * gen () {
//   try {
//     yield console.log(1);
//   } catch (error) {
//     console.log(error && error.message || error);  
//   }
//   yield console.log(2);
//   yield console.log(3);
// }
// let i = gen();
// i.next();
// i.throw();
// i.next();
// // 1
// // undefined
// // 2
// // 3


// const fs = require('fs'),
//       co = require('co'),
//       util = require('util');

// const readFile = util.promisify(fs.readFile);

// function * read () {
//   try {
//     let value1 = yield readFile('./name.txt', 'utf-8');
//     let value2 = yield readFile(value1, 'utf-8');
//     let value3 = yield readFile(value2, 'utf-8');
//   } catch (error) {
//     console.log('err', error && error.message || error);    
//   }
// }
// co(read()).then(data => console.log(data));

// const fs = require('fs');

// const readFile = promisify(fs.readFile);

// function promisify (func) {
//   return (...args) => {
//     return new Promise((resolve, reject) => {
//       func(...args, (err, data) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(data);
//       });
//     });
//   }
// }

// async function read () {
//   try {
//     let value1 = await readFile('./name.txt', 'utf-8');
//     let value2 = await readFile(value1, 'utf-8');
//     let value3 = await readFile(value2, 'utf-8');
//     return value3;
//   } catch (error) {
//     console.log('err', error && error.message || error);    
//   }
// }
// read().then(data => console.log(data)); // 90分


const fs = require('fs');

const readFile = promisify(fs.readFile);

function promisify (func) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
}

// async function read () {
//   let value1 = await readFile('./name.txt', 'utf-8');
//   console.log(a);
//   return value1;
// }
// read()
//   .then(data => console.log(data))
//   .catch(err => console.log(err.message || err));


// async function read () {
//   let value1 = await readFile('./name.tx', 'utf-8');
//   console.log(a);
//   return value1;
// }
// read()
//   .then(data => console.log(data))
//   .catch(err => console.log(err.message || err));


// async function read () {
//   let value1 = await 1;
//   return value1;
// }
// read()
//   .then(data => console.log(data))
//   .catch(err => console.log(err.message || err));


// async function read () {
//   let value1;
//   try {
//     value1 = await readFile('./name.tx', 'utf-8');
//     console.log(a);
//   } catch (error) {
//     console.log('inner', error.message || error);    
//   }
//   return value1;
// }
// read()
//   .then(data => console.log(data))
//   .catch(err => console.log(err.message || err));


// let promise = Promise.all([
//   readFile('./name.txt', 'utf-8'),
//   readFile('./numbe.txt', 'utf-8'),
//   readFile('./score.txt', 'utf-8')
// ])

// promise
// .then(arr => console.log(arr))
// .catch(err => console.log(err.message || err));

// async function readAll () {
//   let val1,
//       val2,
//       val3,
//       res = new Set();
  
//   try {
//     val1 = await readFile('./name.txt', 'utf-8');
//   } catch (error) {
//     console.log('val1', error);    
//   }

//   try {
//     val2 = await readFile('./numbe.txt', 'utf-8');
//   } catch (error) {
//     console.log('val1', error);    
//   }

//   try {
//     val3 = await readFile('./score.txt', 'utf-8');
//   } catch (error) {
//     console.log('val1', error);    
//   }

//   res.add(val1);
//   res.add(val2);
//   res.add(val3);

//   return res;
// }

// readAll()
//   .then(arr => console.log(arr))
//   .catch(err => console.log(err));


