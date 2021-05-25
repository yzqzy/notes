const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpaclPlugin = require('friendly-errors-webpack-plugin');
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');

// const smp = new SpeedMeasureWebpackPlugin();

const PATHS = {
  src: path.join(__dirname, 'src')
}

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
  // resolve: {
  //   alias: {
  //     'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
  //     'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
  //   },
  //   extensions: ['.js'],
  //   mainFields: ['main']
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: path.resolve('src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          'babel-loader',
          // 'babel-loader?cacheDirectory=true',
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
          },
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     mozjpeg: {
          //       progressive: true,
          //       quality: 65
          //     },
          //     // optipng.enabled: false will disable optipng
          //     optipng: {
          //       enabled: false,
          //     },
          //     pngquant: {
          //       quality: [0.65, 0.90],
          //       speed: 4
          //     },
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     // the webp option will enable WEBP
          //     webp: {
          //       quality: 75
          //     }
          //   }
          // }
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
    },
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true
      })
    ]
  },
  stats: 'errors-only',
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
          console.log(stats.compilation.errors);
          process.exit(1);
        }
      })
    },
    // new BundleAnalyzerPlugin()
    // new webpack.DllReferencePlugin({
    //   manifest: require('./build/library/library.json')
    // })
    // new HardSourceWebpackPlugin() 无效
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true })
    })
  ].concat(htmlWebpackPlugins)
}