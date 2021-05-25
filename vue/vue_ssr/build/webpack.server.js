const path = require('path');

const { merge } = require('webpack-merge');
const base = require('./webpack.base');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const resolve = (dir) => {
  return path.resolve(__dirname, dir);
}

module.exports = merge(base, {
  entry: {
    server: resolve('../src/entry-server.js')
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new VueSSRServerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: resolve('../public/index.ssr.html'),
      excludeChunks: ['server'],
      minify: {
        removeComments: false
      }
    })
  ]
})