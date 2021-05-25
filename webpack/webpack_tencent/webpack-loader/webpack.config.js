const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /.\js$/,
        use: [
          path.resolve('./loaders/a-loader.js'),
          path.resolve('./loaders/b-loader.js')
        ]
      }
    ]
  }
}