const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader: {
    // alias: {
    //   'loader-one': path.resolve(__dirname, 'loaders', 'loader-one')
    // }
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   // use: 'loader-one'
      //   use: [
      //     'loader-three',
      //     'loader-two',
      //     'loader-one'
      //   ]
      // },

      // {
      //   test: /\.js$/,
      //   use: 'loader-three',
      // },
      // {
      //   test: /\.js$/,
      //   use: 'loader-two'
      // },
      // {
      //   test: /\.js$/,
      //   use: 'loader-one'
      // },

      // {
      //   test: /\.js$/,
      //   use: 'loader-one',
      //   enforce: 'pre'
      // },
      // {
      //   test: /\.js$/,
      //   use: 'loader-two'
      // },
      // {
      //   test: /\.js$/,
      //   use: 'loader-three',
      //   enforce: 'post'
      // },

      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [ '@babel/preset-env' ]
      //     }
      //   }
      // }

      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'banner-loader',
      //     options: {
      //       text: 'yueluo',
      //       filename: path.resolve(__dirname, 'banner.js')
      //     }
      //   }
      // }

      // {
      //   test: /\.jpg$/,
      //   use: 'file-loader'
      // },

      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100 * 1024
          }
        }
      },

      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}