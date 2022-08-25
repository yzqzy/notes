const path = require('path')
const { merge } = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const allModes = [
  'eval',
  'eval-cheap-source-map',
  'eval-cheap-module-source-map',
  'eval-source-map',
  'cheap-source-map',
  'cheap-module-source-map',
  'inline-cheap-source-map',
  'inline-cheap-module-source-map',
  'source-map',
  'inline-source-map',
  'hidden-source-map',
  'nosources-source-map'
]

const baseConfig =  {
  entry: './src/main.js',
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
      }
    ]
  },
  plugins: [
    // bug: clean failed
    new CleanWebpackPlugin()
  ],
  devServer: {
    static: './public'
  }
}

module.exports = allModes.map(mode => merge(baseConfig, {
  mode: 'none',
  devtool: mode,
  output: {
    filename: `js/${ mode }.js`
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '月落 - Web Developer & JS Fancier',
      meta: {
        keywords: '月落,博客,月落博客,个人博客,月落个人博客,个人网站,程序员,程序员博客,程序员个人博客',
        description: '月落个人博客，记载前端学习历程。'
      },
      filename: `${ mode }.html`,
      template: 'index.html'
    })
  ]
}))
