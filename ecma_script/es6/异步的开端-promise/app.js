// const fs = require('fs');

// fs.readFile('./name.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   if (data) {
//     fs.readFile(data, 'utf-8', (err, data) => {

//       fs.readFile(data, 'utf-8', (err, data) => {
//         console.log(data);
//       });
//     });
//   }
// });


// try {
//   console.log(a);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   setTimeout(() => {
//     console.log(a);
//   }, 30)
// } catch (error) {
//   console.log(error.message);
// }

// new Promise(function (resolve, reject) {
//   console.log('promise');
// });
// console.log(1);

// const promise = new Promise(function (resolve, reject) {
//   setInterval(function () {
//     Math.random() * 100 > 60 ? resolve()
//                              : reject();
//   }, 300)
// });

// promise
//   .then(res => {
//     console.log('函数执行完成');
//   })
//   .catch(err => {
//     console.log('函数执行失败');
//   });
  
// promise.then(
//   () => {
//     console.log('函数执行完成');
//   },
//   () => {
//     console.log('函数执行失败');
//   }
// )


// const promise = new Promise((resolve, reject) => {
//   console.log(0);
//   resolve(1);
// });

// promise.then(
//   (val) => {
//     console.log(val);
//   },

//   (reason) => {
//     console.log(reason);
//   }
// );
// console.log(2);


// setTimeout(() => {
//   console.log('time');
// });
// const promise = new Promise((resolve, reject) => {
//   console.log(0);
//   resolve(1);
// });

// promise.then(
//   (val) => {
//     console.log(val);
//   },

//   (reason) => {
//     console.log(reason);
//   }
// );
// console.log(2);


// Promise.resolve().then(
//   () => {
//     console.log('promise1');

//     setTimeout(() => {
//       console.log('setTimeout2')
//     }) 
//   }
// );
// setTimeout(() => {
//   console.log('setTimeout1');

//   Promise.resolve().then(() => {
//     console.log('promise2');
//   });
// });


// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     Math.random() * 100  > 60 ? resolve('ok')
//                         : reject('no');
//   }, 30);
// });

// promise
//   .then(
//     (val) => {
//       console.log(val);
//     },
//     (reason) => {
//       console.log(reason);
//     }
//   )
//   .then(
//     (val) => {
//       console.log('second', val);
//     },
//     (reason) => {
//       console.log('second', reason);
//     }
//   );
  
// let promise = new Promise((resolve, reject) => {
//   resolve(1);
// });

// promise
//   .then(
//     (val) => {
//       console.log(val);
//       return 2;
//     }
//   )
//   .then(
//     (val) => {
//       console.log('second', val);
//     }
//   );
  
// let promise = new Promise((resolve, reject) => {
//   resolve(1);
// });

// promise
//   .then(
//     (val) => {
//       console.log(val);

//       return new Promise((resolve, reject) => {
//         reject(2);
//       });
//     }
//   )
//   .then(
//     (val) => {
//       console.log('success', val);
//     },
//     (err) => {
//       console.log('error', err);
//     }
//   );


