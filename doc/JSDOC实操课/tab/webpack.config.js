const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
//const miniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development', //production
  entry: {
  	app: path.resolve(__dirname, './src/js/app.js')
  },
  output: {
  	path: path.resolve(__dirname + '/dist'),
  	filename: 'js/[name].js'
  },
  devtool: 'inline-cheap-source-map',
  module: {
  	rules: [
      {
      	test: /\.js$/,
      	loader: 'babel-loader',
      	exclude: [
          path.resolve(__dirname, 'node_modules')
      	]
      },

      {
      	test: /\.tpl$/,
      	loader: 'ejs-loader'
      },

      {
        test: /\.scss$/,
        use: [
         //  {
         //  	loader: miniCssExtractPlugin.loader,
	        //   options: {
	        // 	  hmr: process.env.NODE_ENV === 'development'
	        //   }
	        // },
	        'style-loader',
	        'css-loader',
	        {
	        	loader: 'postcss-loader',
	        	options: {
	        		plugins: function () {
	        			return [autoprefixer('last 5 versions')]
	        		}
	        	}
	        },
	        'sass-loader'
        ]
      },

      {
      	test: /\.(png|jpg|jpeg|gif|ico)$/i,
      	loader: [
          'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]'
      	]
      }
  	]
  },

  plugins: [
    // new uglify(),
    new htmlWebpackPlugin({
      minify: {
      	removeComments: true,
      	collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'Calculator',
      chunksSortMode: 'manual',
      chunks: ['app'],
      excludeChunks: ['node_modules'],
      hash: true
    })

    // new miniCssExtractPlugin({
    // 	filename: 'css/[name].css'
    // })
  ],

  devServer: {
  	watchOptions: {
  		ignored: /node_modules/
  	},
    open: true,
  	host: 'localhost',
  	port: 3000
  }
};

module.exports = config;






