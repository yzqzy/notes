const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseConfig = require('./webpack.common')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './public',
    proxy: {
      '/api': {
        // https://localhost:8080/api/users -> https://api.github.com/api/users
        target: 'https://api.github.com',
        // https://api.github.com/api/users -> https://api.github.com/users
        pathRewrite: {
          '^/api': ''
        },
        // 不能使用 localhost:8080 作为请求 GitHub 主机名
        changeOrigin: true
      }
    }
  }
})
