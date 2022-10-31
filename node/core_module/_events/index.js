const EventEmitter = require('events')

const event = new EventEmitter()

// on
event.on('event', () => {
  console.log('event trigger 1')
})
event.on('event', () => {
  console.log('event trigger 2')
})

// 相同事件触发多次，会执行多次
event.emit('event')
event.emit('event')

console.log('---------------------')

// once
event.once('event-one', () => {
  console.log('event one trigger 1')
})
event.once('event-one', () => {
  console.log('event one trigger 2')
})

// 相同事件触发多次，只会执行一次
event.emit('event-one')
event.emit('event-one')

console.log('---------------------')

const callback = (...args) => {
  console.log('event off trigger', args)
}

event.on('event-off', callback)

// 函数传参
event.emit('event-off', 1, 2)
// 取消订阅
event.off('event-off', callback)
event.emit('event-off')

console.log('---------------------')

// 使用 function 定义的函数可以正确接收到 this
event.on('test', function () {
  console.log('event test trigger', this)
})

event.emit('test')

console.log('---------------------')

// const fs = require('fs')

// const crt = fs.createWriteStream()

// crt.on('pipe', () => {})
