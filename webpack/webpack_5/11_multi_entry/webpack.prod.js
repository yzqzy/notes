const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseConfig = require('./webpack.common')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    clean: true
  },
  devtool: 'nosources-source-map',
  optimization: {
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      minSize: 10000
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: ['public']
    })
  ]
})
