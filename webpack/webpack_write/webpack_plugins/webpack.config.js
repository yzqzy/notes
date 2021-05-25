const path = require('path'),
      DonePlugin = require('./plugins/DonePlugin'),
      AsyncPlugin = require('./plugins/AsyncPlugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      AssetPlugin = require('./plugins/AssetPlugin'),
      InlineResourcePlugin = require('./plugins/InlineResourcePlugin'),
      UploadPlugin = require('./plugins/UploadPlugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new AssetPlugin({
      filename: 'assets-list.md'
    }),
    new DonePlugin(),
    new AsyncPlugin(),
    // new InlineResourcePlugin({
    //   reg: /\.(js|css)$/
    // })
    new UploadPlugin({
      bucket: 'webpack-imgs',
      domain: 'http://qcivnsk9f.bkt.clouddn.com/',
      accessKey: 'mSjPDAb-aNtn7AIcQzYQX0m0kxAVqv0gtSOlN47A',
      secretKey: 'xOxd_n8tciVi2ICI2c4i-2FyBQZD6SY4CS8ZU792'
    })
  ]
}
