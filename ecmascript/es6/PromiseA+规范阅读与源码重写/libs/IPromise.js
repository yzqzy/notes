const PENDING = 'PENDING',
      FULFILLED = "FULFILLED",
      REJECTED = "REJECTED";

function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<IPromise>'));
  }

  let called = false; 

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        // promise
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
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

class IPromise {
  constructor (executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // notify
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // notify
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // x 普通值 or promise
  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let promise2 = new IPromise((resolve, reject) => {
      switch (this.status) {
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
          }, 0)
          break;
        case PENDING:
          // subscrible
          this.onFulfilledCallbacks.push(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);              
            }
          });
          this.onRejectedCallbacks.push(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);              
            }
          });
          break;
        default:
          break;
      }
    });

    return promise2;
  }

  catch (errorCallback) {
    return this.then(null, errorCallback);
  }
}

module.exports = IPromise;