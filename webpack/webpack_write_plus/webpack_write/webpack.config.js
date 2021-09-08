const path = require('path');

module.exports = {
  devtool: 'none',
  mode: 'development',
  entry: './src/index.js',
  context: process.cwd(),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}