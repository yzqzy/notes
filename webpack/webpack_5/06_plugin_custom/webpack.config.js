const path = require('path')
const { sources, Compilation } = require('webpack')

class MyPlugin {
  apply(compiler) {
    // compiler.hooks.emit.tap('MyPlugin', compilation => {
    //   // compilation 可以理解成此次打包的上下文
    //   for (const name in compilation.assets) {
    //     if (name.endsWith('.js')) {
    //       const contents = compilation.assets[name].source()
    //       const withoutComments = contents.replace(/\/\*+\*\//g, '')

    //       compilation.assets[name] = {
    //         source: () => withoutComments,
    //         size: () => withoutComments.length
    //       }
    //     }
    //   }
    // })
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: 'MyPlugin',
          // https://github.com/webpack/webpack/blob/master/lib/Compilation.js#L3280
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          for (const name in assets) {
            if (name.endsWith('.js')) {
              const contents = assets[name].source()

              const withoutComments = contents.replace(/\/\*+\*\//g, '')

              assets[name] = {
                source: () => withoutComments,
                ...assets[name]
              }
            }
          }
          return Promise.resolve(assets)
        }
      )
    })
  }
}

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MyPlugin()
  ]
}
