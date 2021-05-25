const path = require('path');
const MyPlugin = require('./plugins/my-plugin');
const ZipPlugin = require('./plugins/zip-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new MyPlugin({
      name: 'my plugin',
      author: 'yueluo'
    }),
    new ZipPlugin({
      filename: 'offline'
    })
  ]
}