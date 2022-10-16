// const salesOffices = {}

// salesOffices.clientList = []

// salesOffices.listen = function (fn) {
//   this.clientList.push(fn)
// }

// salesOffices.trigger = function () {
//   this.clientList.forEach(fn => fn.apply(this, arguments))
// }

// // listen
// salesOffices.listen((price, square) => {
//   console.log(`房屋面积：${square}, 房屋价格：${price}`)
// })
// salesOffices.listen((price, square) => {
//   console.log(`房屋面积：${square}, 房屋价格：${price}`)
// })

// // trigger
// setTimeout(() => {
//   salesOffices.trigger(2000, 80)
//   salesOffices.trigger(3000, 110)
// }, 1000)

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// const salesOffices = {}

// salesOffices.clientList = []

// salesOffices.listen = function (key, fn) {
//   if (!this.clientList[key]) this.clientList[key] = []
//   this.clientList[key].push(fn)
// }

// salesOffices.trigger = function () {
//   const key = [].shift.call(arguments)
//   this.clientList[key].forEach(fn => fn.apply(this, arguments))
// }

// // listen
// salesOffices.listen('2000meter', (price, square) => {
//   console.log(`房屋面积：${square}, 房屋价格：${price}`)
// })
// salesOffices.listen('3000meter', (price, square) => {
//   console.log(`房屋面积：${square}, 房屋价格：${price}`)
// })

// // trigger
// setTimeout(() => {
//   salesOffices.trigger('2000meter', 2000, 80)
//   salesOffices.trigger('3000meter', 3000, 110)
// }, 1000)

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// const salesOffices = {}

// salesOffices.clientList = []

// salesOffices.listen = function (key, fn) {
//   if (!this.clientList[key]) this.clientList[key] = []
//   this.clientList[key].push(fn)
// }

// salesOffices.remove = function (key, fn) {
//   const fns = this.clientList[key]

//   if (!fns) return false

//   const idx = fns.findIndex(_fn => _fn === fn)

//   fns.splice(idx, 1)
// }

// salesOffices.trigger = function () {
//   const key = [].shift.call(arguments)
//   this.clientList[key].forEach(fn => fn.apply(this, arguments))
// }

// function test(price, square) {
//   console.log(`房屋面积：${square}, 房屋价格：${price}`)
// }

// // listen
// salesOffices.listen('2000meter', test)
// salesOffices.listen('3000meter', (price, square) => {
//   console.log(`房屋面积：${square}, 房屋价格：${price}`)
// })

// // rmeove
// salesOffices.remove('2000meter', test)

// // trigger
// setTimeout(() => {
//   salesOffices.trigger('2000meter', 2000, 80)
//   salesOffices.trigger('3000meter', 3000, 110)
// }, 1000)

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

class $Event {
  constructor() {
    this.clientList = []
  }

  listen(key, fn) {
    if (!this.clientList[key]) this.clientList[key] = []
    this.clientList[key].push(fn)
  }

  trigger() {
    const key = [].shift.call(arguments)
    this.clientList[key].forEach(fn => fn.apply(this, arguments))
  }

  remove(key, fn) {
    const fns = this.clientList[key]

    if (!fns) return false

    const idx = fns.findIndex(_fn => _fn === fn)

    fns.splice(idx, 1)
  }
}

class SalesOffices extends $Event {}
const salesOffices = new SalesOffices()

const test = (price, square) => {
  console.log(`房屋面积：${square}, 房屋价格：${price}`)
}

// listen
salesOffices.listen('2000meter', test)
salesOffices.listen('3000meter', (price, square) => {
  console.log(`房屋面积：${square}, 房屋价格：${price}`)
})

// rmeove
salesOffices.remove('2000meter', test)

// trigger
setTimeout(() => {
  salesOffices.trigger('2000meter', 2000, 80)
  salesOffices.trigger('3000meter', 3000, 110)
}, 1000)
