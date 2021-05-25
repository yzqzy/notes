const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 代码调试，配置源代码映射
  devtool: 'source-map',
  // 解析路径配置
  resolve: {
    modules: [
      path.resolve(__dirname, 'source'),
      path.resolve('node_modules')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}