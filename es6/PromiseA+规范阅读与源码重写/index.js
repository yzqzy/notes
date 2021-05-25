const IPromise = require('./libs/IPromise');

// let promise = new IPromise((resolve, reject) => {
//   // resolve('this is a value');
//   // reject('this is a reason');
//   // throw new Error('this is a error');
  
//   setTimeout(() => {
//     resolve('this is async value');
//   }, 3000);
// });

// promise.then((value) => {
//     console.log(value);
//   }, (reason) => {
//     console.log(reason);
//   });



let promise1 = new IPromise((resolve, reject) => {
  resolve('promise1');
});

let promise2 = promise1.then((value) => {
  // throw new Error('');
  // return Promise.resolve(value + '-> then -> promise2');
  // return value + '-> then -> promise2';
  // return new IPromise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(value + '-> then -> promise2');
  //   }, 2000)
  // });
  return new IPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(new IPromise((resolve, reject) => {
        resolve(new IPromise((resolve, reject) => {
          resolve(value + '-> then -> promise2');
        }));
      }));
    }, 2000)
  });
}, (reason) => {
  console.log(reason);
})

promise2
  .then().then().then()
  .then((value) => {
    throw Error('error');
    // console.log(value);
  }, (reason) => {
    console.log(reason);
  })
  .catch((reason) => {
    console.log(reason);
  });
