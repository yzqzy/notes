function $Event() {
  this._events = Object.create(null)
}

$Event.prototype.on = function (type, callback) {
  if (!this._events[type]) this._events[type] = []
  this._events[type].push(callback)
}

$Event.prototype.emit = function (type, ...args) {
  if (this._events && Array.isArray(this._events[type])) {
    this._events[type].forEach(callback => {
      callback.call(this, ...args)
    })
  }
}

$Event.prototype.off = function (type, callback) {
  if (this._events && this._events[type]) {
    this._events[type] = this._events[type].filter(
      item => item !== callback && item.link != callback
    )
  }
}

$Event.prototype.once = function (type, callback) {
  const _callback = function (...args) {
    callback.call(this, ...args)
    this.off(type, _callback)
  }
  _callback.link = callback
  this.on(type, _callback)
}

console.log('---------------------------------------')

const ev = new $Event()

const fn = function (...args) {
  console.log(`event01 process ${args}`)
}

ev.on('event01', fn)
ev.on('event01', () => {
  console.log('event01 process')
})

ev.emit('event01', 1, 2)
ev.off('event01', fn)

ev.emit('event01', 1, 2)

console.log('---------------------------------------')

ev.once('event02', fn)
ev.emit('event02', 1, 2)
ev.emit('event02', 1, 2)

console.log('---------------------------------------')

ev.once('event03', fn)
ev.off('event03', fn)
ev.emit('event03', 1, 2)
ev.emit('event03', 1, 2)
