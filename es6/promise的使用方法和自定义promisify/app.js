// const promise = new Promise((resolve, reject) => {
//   resolve(a);
// });

// promise.then(
//   (res) => {
//     console.log('resolve', res);
//   }, 
//   (err) => {
//     console.log('reject', err.message);
//   }
// );


// let promise = new Promise((resolve, reject) => {
//   resolve('ok');
//   console.log(a);
// });
// promise
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   })

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(new Error('fail'))
//   }, 3000);  
// });
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(p1);
//   }, 1000)
// });

// p2
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err.message);
//   })


// const p1 = new Promise((resolve, reject) => {
//   resolve(1);

//   console.log('2');
// });
// p1.then(res => {
//   console.log(res);
// });

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 1000);
// });
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(2);
//   }, 3000);
// });
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3);
//   }, 2000);
// });

// Promise.all([p1, p2, p3])
//   .then(arr => {
//     console.log(arr);
//   })
//   .catch(err => {
//     console.log('err', err);
//   })


// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 1000);
// });
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2);
//   }, 3000);
// });
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3);
//   }, 2000);
// });

// Promise.race([p1, p2, p3])
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   })


// Promise.resolve()


// let thenable = {
//   then: function (resolve) {
//     resolve(42);
//   }
// }
// let p1 = Promise.resolve(thenable);
// p1.then(val => console.log(val)); // 42


// let thenable = {
//   then: function (resolve, reject) {
//     reject(41);
//   }
// }
// let p1 = Promise.reject(thenable);
// p1.catch(val => console.log(val)); // 42


// let promise = Promise.resolve('hello');
// promise
//   .then((val) => {
//     console.log(val);
//   });

// setTimeout(() => {
//   console.log(3); 
// });
// Promise.resolve().then(() => {
//   console.log(2);
// })
// console.log(1);


// const promise = Promise.reject('123');
// promise
//   .then(res => {
//     console.log('then', res);
//   })
//   .catch(err => {
//     console.log('catch', err);
//   })

// const fs = require('fs');

// function readFile (path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, 'utf-8', (err, data) => {
//       if (data) {
//         resolve(data);
//         return;
//       }
//       console.log(err);
//     });
//   });
// }

// readFile('./name.txt')
//   .then(data => readFile(data))
//   .then(data => readFile(data))
//   .then(data => console.log(data));


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

// let readFile = promisify(fs.readFile);

// readFile('./name.txt', 'utf-8')
//   .then(data => readFile(data, 'utf-8'))
//   .then(data => readFile(data, 'utf-8'))
//   .then(data => console.log(data));


// const fs = require('fs'),
//       util = require('util');

// let readFile = util.promisify(fs.readFile);

// readFile('./name.txt', 'utf-8')
//   .then(data => readFile(data, 'utf-8'))
//   .then(data => readFile(data, 'utf-8'))
//   .then(data => console.log(data));


const fs = require('fs');

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

function promisifyAll (obj) {
  for (let [key, func] of Object.entries(obj)) {
    if (typeof func === 'function') {
      obj[key + 'Promise'] = promisify(func);
    }
  }
}

promisifyAll(fs);

fs.readFilePromise('./name.txt', 'utf-8')
  .then(data => fs.readFilePromise(data, 'utf-8'))
  .then(data => fs.readFilePromise(data, 'utf-8'))
  .then(data => console.log(data));