const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseConfig = require('./webpack.common')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: ['public']
    })
  ]
})
