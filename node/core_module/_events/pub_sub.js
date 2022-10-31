class PubSub {
  constructor() {
    this._events = {}
  }

  subscribe(event, callback) {
    if (!this._events[event]) this._events[event] = []

    this._events[event].push(callback)
  }

  publish(event, ...args) {
    const items = this._events[event]

    Array.isArray(items) &&
      items.forEach(function (callback) {
        callback.call(this, ...args)
      })
  }
}

const ps = new PubSub()

ps.subscribe('event', () => {
  console.log('event trigger 01')
})
ps.subscribe('event', () => {
  console.log('event trigger 02')
})

ps.publish('event')
