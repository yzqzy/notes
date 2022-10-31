const EventEmitter = require('events')

const event = new EventEmitter()

// on
event.on('event', () => {
  console.log('event trigger 1')
})
event.on('event', () => {
  console.log('event trigger 2')
})

// emit
event.emit('event')
