const fs = require('fs')

const EventEmitter = require('events')

class $FileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.readOffset = 0

    this.open()

    // all listener
    this.on('newListener', type => {
      switch (type) {
        case 'data':
          this.read()
          break
      }
    })
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit('error', err)
        return
      }

      this.fd = fd
      this.emit('open', fd)
    })
  }

  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }

    const buf = Buffer.alloc(this.highWaterMark)

    const howMuchToRead = this.end
      ? Math.min(this.end - this.readOffset + 1, this.highWaterMark)
      : this.highWaterMark

    fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        this.readOffset += readBytes
        this.emit('data', buf.slice(0, readBytes))
        this.read()
        return
      }

      this.emit('end')
      this.close()
    })
  }

  close() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
}

// -----------------

const rs = new $FileReadStream('test.txt', {
  end: 7,
  highWaterMark: 3
})

// rs.on('open', fd => {
//   console.log('open', fd)
// })

// rs.on('error', err => {
//   console.log('error', err)
// })

rs.on('data', chunk => {
  console.log('data', chunk)
})

rs.on('end', () => {
  console.log('end')
})

rs.on('close', () => {
  console.log('close')
})
