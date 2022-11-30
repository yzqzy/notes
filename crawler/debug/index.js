const startDebug = () => {
  debugger
}

let i = 0
while (i < 10) {
  startDebug()
  console.log(`i ${i++}`)
}
