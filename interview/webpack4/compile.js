const webpack = require('webpack')
const options = require('./webpack.config')

const compiler = webpack(options)

compiler.run(function(err, stats) {
  console.log(err)
  // console.log(stats.toJson())
})

