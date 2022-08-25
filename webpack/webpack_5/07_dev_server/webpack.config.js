const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10 KB
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '月落 - Web Developer & JS Fancier',
      meta: {
        keywords: '月落,博客,月落博客,个人博客,月落个人博客,个人网站,程序员,程序员博客,程序员个人博客',
        description: '月落个人博客，记载前端学习历程。'
      },
      template: 'index.html'
    }),
    // production
    // new CopyWebpackPlugin({
    //   patterns: ['public']
    // })
  ],
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
}
