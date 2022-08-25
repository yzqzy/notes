const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    publicPath: 'dist/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'html-loader',
          path.resolve(__dirname, 'md-loader')
        ]
      }
    ]
  }
}
