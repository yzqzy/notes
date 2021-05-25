const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  // // 默认 false，也就是不开启
  // watch: true,
  // // 只有开启监听模式，watchOptions 才生效
  // watchOptions: {
  //   // 默认为空，不监听的文件或者文件夹，支持正则匹配
  //   ignored: /node_modules/,
  //   // 监听到变化发生后会等 300ms 再去执行，默认 300ms
  //   aggregateTimeout: 300,
  //   // 判断文件是否变化是通过不停询问系统指定文件有没有变化实现的，默认每秒询问 1 次
  //   poll: 1000
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /.(png|jpg|gif|jpeg)$/,
      //   use: 'file-loader'
      // },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}