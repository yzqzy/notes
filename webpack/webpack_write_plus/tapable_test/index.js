const { AsyncSeriesHook } = require('tapable');

const hook = new AsyncSeriesHook(['name']);

console.time('time');
hook.tapPromise('fn1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn1--> ', name);
      resolve();
    }, 1000)
  })
});

hook.tapPromise('fn2', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn2--> ', name);
      resolve(false);
    }, 2000)
  })
});

hook.tapPromise('fn3', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn3--> ', name);
      resolve();
    }, 3000)
  })
});

hook.promise('yueluo').then(() => {
  console.log('~~~~~~')
  console.timeEnd('time');
});

// fn1-->  yueluo
// fn2-->  yueluo
// fn3-->  yueluo
// ~~~~~~
// time: 6050.305ms