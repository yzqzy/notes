const PENDING = 'PENGING' // pending
const FULFILLED = 'FULFILLED' // fulfilled
const REJECTED = 'REJECTED' // rejected

class $Promise {
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value

        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    switch (this.state) {
      case FULFILLED:
        onFulfilled(this.value)
        break
      case REJECTED:
        onRejected(this.reason)
        break
      case PENDING:
        this.onFulfilledCallbacks.push(() => {
          onFulfilled(this.value)
        })
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason)
        })
        break
    }
  }
}

module.exports = $Promise
