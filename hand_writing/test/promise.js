const $Promise = require('../utils/promise/promise01.js')

const promise = new $Promise((resolve, reject) => {
  resolve('success')
})

promise.then((value) => {
  console.log(value)
}, (reason) => {
  console.log(reason)
})
