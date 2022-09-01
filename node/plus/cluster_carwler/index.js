const cluster = require('node:cluster')
const os = require('os')

if (cluster.isPrimary) {
  const cpuNums = os.cpus().length / 2

  for (let i = 0; i < cpuNums; i++) {
    const worker = cluster.fork()

    worker.send([i])

    worker.on('message', params => {
      console.log(params)
    })
  }
} else {
  require('./app')
}
