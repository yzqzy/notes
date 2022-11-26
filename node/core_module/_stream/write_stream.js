const fs = require('fs')
const EventListener = require('events')

const { Queue } = require('./linked_queue')

class $WriteStream extends EventListener {
  constructor(path, options) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.encoding = options.encoding || 'uft8'
    this.highWaterMark = options.highWaterMark || 16 * 1024

    this.open()

    this.writeOffset = this.start
    this.wirtting = false
    this.writeLen = 0
    this.needDrain = false
    this.cache = new Queue()
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.emit('error', err)
      }

      // normal
      this.fd = fd
      this.emit('open', fd)
    })
  }

  write(chunk, encoding, cb) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

    this.writeLen += chunk.length

    const falg = this.writeLen < this.highWaterMark

    this.needDrain = !falg

    if (this.wirtting) {
      // 正在执行写入，需要排队
      this.cache.push({
        chunk,
        encoding,
        cb
      })
    } else {
      this.wirtting = true
      // 正常首次写入
      this._write(chunk, encoding, () => {
        cb()
        // 清空排队内容
        this._clearBuffer()
      })
    }

    return falg
  }

  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => {
        return this._write(chunk, encoding, cb)
      })
    }

    fs.write(this.fd, chunk, this.start, chunk.length, this.writeOffset, (err, written) => {
      this.writeOffset += written
      this.writeLen -= written

      cb && cb()
    })
  }

  _clearBuffer() {
    const data = this.cache.shift()

    if (data) {
      this._write(data.element.chunk, data.element.encoding, () => {
        data.element.cb && data.element.cb()
        this._clearBuffer()
      })
    } else {
      if (this.needDrain) {
        this.needDrain = false
        this.emit('drain')
      }
    }
  }
}

module.exports = {
  $WriteStream
}

const ws = new $WriteStream('./test04.txt', {
  highWaterMark: 2
})

ws.on('open', fd => {
  console.log('open file: ', fd)
})

let flag = ws.write('1', ' utf8', () => {
  console.log('write success')
})
// console.log('flag: ', flag)

flag = ws.write('23', 'utf8', () => {
  console.log('write success')
})
// console.log('flag: ', flag)

flag = ws.write('月落', 'utf8', () => {
  console.log('write success')
})

ws.on('drain', () => {
  console.log('drain')
})
