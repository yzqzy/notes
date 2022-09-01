process.on('message', params => {
  console.log(`worker-[${process.pid}]: start`, params)

  process.send(`worker-[${process.pid}]: crawler completed.`)
  process.exit(-1)
})
