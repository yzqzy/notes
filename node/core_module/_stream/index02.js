const { Duplex } = require('stream')

const source = ['heora', 'yueluo', 'yzq']

class $Duplex extends Duplex {
  constructor(options) {
    super(source, options)
    this.source = source
  }

  _read() {
    this.push(this.source.shift() || null)
  }

  _write(chunk, enc, next) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString()
    }
    process.stdout.write(chunk + '--')
    process.nextTick(next)
  }
}

const duplex = new $Duplex(source)

duplex.on('data', chunk => {
  console.log(chunk.toString())
})

duplex.write('test', 'utf-8', () => {
  console.log('duplex test: readable and writeable')
})
