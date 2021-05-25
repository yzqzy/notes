const path = require('path');

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();

const devConfig = {
  mode: 'devlopment',
  output: {
    filename: '[name].js',
    path: path.resolve(projectRoot, 'dist'),
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
