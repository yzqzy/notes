const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader',
          options: {
            // 当这个配置项开启后，只做语言转换而不做类型检查
            // 实际项目中，你会发现随着项目越来越大，构建时间越来越长，开启下面这个配置就会启动一种快速构建模式
            transpileOnly: true,
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}
