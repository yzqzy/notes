const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.common')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map'
})
