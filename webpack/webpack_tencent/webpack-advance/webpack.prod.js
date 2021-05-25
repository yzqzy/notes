const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpaclPlugin = require('friendly-errors-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const htmlWebpackExternalsPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'))

  entryFiles.map((entryFile) => {
    const match = entryFile.match(/src\/pages\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `src/pages/${pageName}/index.html`),
        filename: `${ pageName }.html`,
        chunks: [ pageName ],
        excludeChunks: ['node_modules'],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      }),
    );
    htmlWebpackExternalsPlugins.push(
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'react',
            entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
            global: 'React'
          },
          {
            module: 'react-dom',
            entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
            global: 'ReactDOM'
          },
        ],
        files: [`${pageName}.html`]
      })
    )
  });

  return {
    entry,
    htmlWebpackPlugins,
    htmlWebpackExternalsPlugins
  }
}

const { entry, htmlWebpackPlugins, htmlWebpackExternalsPlugins }  = setMPA();

module.exports = {
  entry,
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem = 75px、适合 750 设计稿
              remPrecesion: 8 // px => rem 小数点的位数
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: 10240
            },
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            },
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpaclPlugin(),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (
            stats.compilation.errors && 
            stats.compilation.errors.length && 
            process.argv.indexOf('--watch') == -1
          ) {
          console.log('build error');
          process.exit(1);
        }
      })
    }
  ].concat(htmlWebpackPlugins),
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
          priority: -10
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: -20
        }
      }
    }
  },
  stats: 'errors-only'
}