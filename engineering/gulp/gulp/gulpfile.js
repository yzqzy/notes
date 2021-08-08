const { series, parallel } = require('gulp');

const task1 = done => {
  setTimeout(() => {
    console.log('task1 working');
    done();
  }, 1000);
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2 working');
    done();
  }, 1000);
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3 working');
    done();
  }, 1000);
}

exports.foo = series(task1, task2, task3); // 串行执行
exports.bar = parallel(task1, task2, task3); // 同步执行