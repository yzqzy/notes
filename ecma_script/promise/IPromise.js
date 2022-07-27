const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #[$Promise]'));
  }

  let called = false;

  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

class $Promise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (value instanceof $Promise) {
        return value.then(resolve, reject);
      }

      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;

        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let promise2 = new $Promise((resolve, reject) => {
      switch (this.state) {
        case FULFILLED:
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        case REJECTED:
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        case PENDING:
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
          break;
      }
    });

    return promise2;
  }

  catch (errorCallback) {
    return this.then(null, errorCallback);
  }

  finally (finallyCallback) {
    return this.then((value) => {
      return $Promise.resolve(finallyCallback()).then(() => value);
    }, (reason) => {
      return $Promise.resolve(finallyCallback()).then(() => {
        throw reason;
      });
    });
  }

  static resolve (value) {
    return new $Promise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject (reason) {
    return new $Promise((resolve, reject) => {
      reject(reason);
    });
  }

  static all (promiseArr) {
    let resArr = [],
        idx = 0;

    return new $Promise((resolve, reject) => {
      promiseArr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(value => 
            formatResArr(value, index, resolve), reject);
        } else {
          formatResArr(promise, index, resolve);
        }
      });
    });

    function formatResArr (value, index, resolve) {
      resArr[index] = value;

      if (++idx === promiseArr.length) {
        resolve(resArr);
      }
    }
  }

  static allSettled (promiseArr) {
    let resArr = [],
        idx = 0;

    if (!isIterable(promiseArr)) {
      throw new TypeError(`${promiseArr} is not iterable (cannot read property Symbol(Symbol.iterator))`);
    };

    return new Promise((resolve, reject) => {
      if (promiseArr.length === 0) {
        return resolve([]);
      }

      promiseArr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(value => {
            formatResArr('fulfilled', value, index, resolve);
          }, (reason) => {
            formatResArr('rejected', reason, index, resolve);
          });
        } else {
          formatResArr('fulfilled', promise, index, resolve);
        }
      });
    });

    function formatResArr (status, value, index, resolve) {
      switch (status) {
        case 'fulfilled':
          resArr[index] = {
            status,
            value
          }
          break;
        case 'rejected':
          resArr[index] = {
            status,
            reason: value
          }
          break;
        default:
          break;
      }

      if (++idx == promiseArr.length) {
        resolve(resArr);
      }
    }
  }

  static race (promiseArr) {
    return new $Promise((resolve, reject) => {
      promiseArr.forEach(promise => {
        if (isPromise(promise)) {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      });
    });
  }
}

function isPromise (x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then;
    return typeof then === 'function';
  }
  return false;
}

function isIterable (value) {
  return value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function';
}

// 脚本检测
$Promise.defer = $Promise.deferred = function () {
  let deferred = {};

  deferred.promise = new $Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}

module.exports = $Promise;