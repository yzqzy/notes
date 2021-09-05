const AsyncParallelHook = require('./lib/AsyncParallelHook.js')

const hook = new AsyncParallelHook(['name', 'age']);

hook.tapAsync('fn1', function (name, age, callback) {
  console.log('fn1--> ', name, age);
  callback();
});

hook.tapAsync('fn2', function (name, age, callback) {
  console.log('fn2--> ', name, age);
  callback();
});

hook.tapAsync('fn3', function (name, age, callback) {
  console.log('fn3--> ', name, age);
  callback();
});

hook.callAsync('yueluo', 18, function () {
  console.log('end~~');
});
