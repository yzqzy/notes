const { useState, useEffect } = require('./index')

const [usernmae, setUsernmae] = useState('heora')
const [age] = useState(24)

console.log(usernmae())

useEffect(() => {
  console.log(`effect: ${usernmae()}-${age()}`)
})

setTimeout(() => {
  setUsernmae('yueluo')
}, 2 * 1000)
