const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  // 
  optimization: {
    runtimeChunk: 'single'
  },
  // https://webpack.docschina.org/configuration/devtool
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ],
  // webpack-dev-server 内部使用 webpack-dev-middleware
  devServer: {
    static: './dist'
  }
}
