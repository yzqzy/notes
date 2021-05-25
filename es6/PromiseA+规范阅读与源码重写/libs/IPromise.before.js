const PENDING = 'PENDING',
      FULFILLED = "FULFILLED",
      REJECTED = "REJECTED";

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

  then (onFulfilled, onRejected) {
    switch (this.status) {
      case FULFILLED:
        onFulfilled(this.value);
        break;
      case REJECTED:
        onRejected(this.reason);
        break;
      case PENDING:
        // subscrible
        this.onFulfilledCallbacks.push(() => {
          onFulfilled(this.value);
        });
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason);
        });
        break;
      default:
        break;
    }
  }
}

module.exports = IPromise;