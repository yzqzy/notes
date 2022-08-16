const path = require('path')
const express = require('express')

const history = require('connect-history-api-fallback')

const app = express()

app.use(history()) // support history

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.listen(3000, () => {
  console.log('server listening port: 3000')
})
