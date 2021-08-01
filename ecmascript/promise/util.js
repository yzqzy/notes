const IPromise = require('./IPromise');

module.exports = {
  promisify (fn) {
    return function (...agrs) {
      return new IPromise((resolve, reject) => {
        fn(...agrs, (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      });
    }
  },

  promisifyAll (fns) {
    Object.keys(fns).forEach(fnName => {
      if (typeof fns[fnName] === 'function') {
        fns[fnName + 'Async'] = this.promisify(fns[fnName]);
      }
    });
    return fns;
  }
}