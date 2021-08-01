// function makeIterator (arr) {
//   var nextIdx = 0;

//   return {
//     next () {
//       if (nextIdx < arr.length) {
//         return {
//           value: arr[nextIdx++],
//           done: false
//         }
//       } else {
//         return {
//           value: undefined,
//           done: true
//         }
//       }
//     }
//   }
// }

// var it = makeIterator(['a', 'b']);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// const obj = {
//   start: [1, 3, 2],
//   end: [7, 8, 9],
//   [Symbol.iterator] () {
//     var nextIndex = 0,
//         arr = [...this.start, ...this.end],
//         len = arr.length;

//     return {
//       next () {
//         return nextIndex < len ? { value: arr[nextIndex++], done: false }
//                                : { value: undefined, done: true };
//       }
//     }    
//   }
// }

// for (let i of obj) {
//   console.log(i);
// }


// console.log(new Map([ ['a', 1], ['b', 2] ]));

// let map = new Map([ ['a', 1], ['b', 2] ]);
// for (const i of map) {
//   console.log(i);
// }

// let map = new Map([ ['a', 1], ['b', 2] ]);
// for (const [key, value] of map) {
//   console.log(key, value);
// }


// let obj = {
//   a: 1,
//   b: 2,
//   c: 3,
//   [Symbol.iterator] () {
//     const map = new Map();

//     for (const [key, value] of Object.entries(this)) {
//       map.set(key, value);
//     }

//     let mapEntries = [...map.entries()],
//         nextIdx = 0,
//         length = mapEntries.length;

//     return {
//       next () {
//         return nextIdx < length ? { value: mapEntries[nextIdx++], done: false }
//                                 : { value: undefined, done: true }
//       },
//       return () {
//         return {
//           value: 'break this iterator',
//           done: true
//         }
//       }
//     }
//   }
// }
// for (const [key, value]  of obj) {
//   console.log(key, value);
//   break;
// }


// function * test () {}
// let iter = test();
// console.log(iter); 


// function * test () {
//   yield 'a';
//   yield 'b';
//   yield 'c';
//   yield 'd';
// }
// let iter = test();
// console.log(iter.next()); // { value: 'a', done: false }
// console.log(iter.next()); // { value: 'b', done: false } 
// console.log(iter.next()); // { value: 'c', done: false }
// console.log(iter.next()); // { value: 'd', done: false }
// console.log(iter.next()); // { value: undefined, done: true }


// function * test () {
//   console.log(0);
//   yield 'a';
//   console.log(1);
//   yield 'b';
//   console.log(2);
//   yield 'c';
//   console.log(3);
//   return 'd';
// }
// const iter = test();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// function * test () {
//   let a = yield 'a';
//   console.log(a);
//   yield 'b';
//   yield 'c';
//   return 'd';
// }
// const iter = test();
// console.log(iter.next());
// // { value: 'a', done: false }
// console.log(iter.next());
// // undefined
// // { value: 'ab', done: false }


// function * demo () {
//   yield
// }
// let iter = demo();
// console.log(iter.next());
// // { value: undefined, done: false }


// function * demo () {
//   console.log('hello' + yield 123); // 报错
//   console.log('hello' + (yield 123)); // 不报错
// }


// function * demo () {
//   foo(yield 'a', yield 'b');
// }
// function foo (a, b) {
//   console.log(a, b);
// }
// let iter = demo();
// console.log(iter.next())
// // { value: 'a', done: false }
// console.log(iter.next())
// // { value: 'b', done: false }
// console.log(iter.next())
// // undefined undefined
// // { value: undefined, done: true }


// function * foo () {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
//   yield 6;
//   return 7;
// }
// for (let i of foo()) {
//   console.log(i);
// }
// // 1 2 3 4 5 6


// function * foo () {
//   let value1 = yield 1;
//   console.log(value1);

//   let value2 = yield 2;
//   console.log(value2);

//   let value3 = yield 3;
//   console.log(value3);

//   let value4 = yield 4;
//   console.log(value4);
// }
// let iter = foo();
// console.log(iter.next('one'));
// // { value: 1, done: false }
// console.log(iter.next('two'));
// // two
// // { value: 2, done: false }


// let obj = {
//   start: [1, 3, 2],
//   end: [7, 8, 9],
//   [Symbol.iterator]: function * () {
//     var nextIdx = 0,
//         arr = [...this.start, ...this.end],
//         len = arr.length;

//     while (nextIdx < len) {
//       yield arr[nextIdx++]
//     }
//   }
// }
// for (const i of obj) {
//   console.log(i);
// }


// let obj = {
//   a: 1,
//   b: 2,
//   c: 3,
//   [Symbol.iterator]: function * () {
//     const map = new Map();

//     for (const [key, value] of Object.entries(this)) {
//       map.set(key, value);
//     }

//     let mapEntries = [...map.entries()],
//         nextIdx = 0,
//         length = mapEntries.length;

//     while (nextIdx < length) {
//       yield mapEntries[nextIdx++];
//     }
//   }
// }
// for (const [key, value]  of obj) {
//   console.log(key, value);
// }


// const fs = require('fs');

// function promisify (fn) {
//   return (...args) => {
//     return new Promise((resolve, reject) => {
//       fn(...args, (err, data) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(data);
//       })
//     });
//   }
// }
  
// let readFile = promisify(fs.readFile);

// function * read () {
//   let val1 = yield readFile('./name.txt', 'utf-8');
//   let val2 = yield readFile(val1, 'utf-8');
//   yield readFile(val2, 'utf-8');
// }

// const iter = read();

// let { value, done } = iter.next();

// value
//   .then(val1 => {
//     let { value } = iter.next(val1);

//     value.then(val2 => {

//       let { value } = iter.next(val2);

//       value.then(val3 => {
//         console.log(val3);
//       })
//     })
//   })



const fs = require('fs');

function promisify (fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      })
    });
  }
}
  
let readFile = promisify(fs.readFile);

function * read () {
  let val1 = yield readFile('./name.txt', 'utf-8');
  let val2 = yield readFile(val1, 'utf-8');
  let val3 = yield readFile(val2, 'utf-8');
  console.log(val3);
}

function Co (iter) {
  return new Promise((resolve, reject) => {
    let next = (data) => {
      const { value, done } = iter.next(data);

      if (done) {
        resolve(data);
      } else {
        value.then(val => next(val));
      }
    }
    
    next();
  });  
}

Co(read()).then(val => {
  console.log('执行完成', val);
});
