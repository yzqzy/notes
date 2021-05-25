const path = require('path');
const glob = require('glob');

const { merge } = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();

const setMPA = () => {
  const htmlWebpackExternalsPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/pages/*/index.js'));

  entryFiles.map((entryFile) => {
    const match = entryFile.match(/src\/pages\/(.*)\/index\.js/);
    const pageName = match && match[1];

    return htmlWebpackExternalsPlugins.push(
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'react',
            entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
            global: 'React',
          },
          {
            module: 'react-dom',
            entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
            global: 'ReactDOM',
          },
        ],
        files: [`${pageName}.html`],
      }),
    );
  });

  return {
    htmlWebpackExternalsPlugins,
  };
};

const { htmlWebpackExternalsPlugins } = setMPA();

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(projectRoot, 'dist'),
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ].concat(htmlWebpackExternalsPlugins),
};

module.exports = merge(baseConfig, prodConfig);
