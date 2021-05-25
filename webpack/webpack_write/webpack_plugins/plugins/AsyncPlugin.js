class AsyncPlugin {
  // apply (compiler) {
  //   compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
  //     setTimeout(() => {
  //       console.log('emit done.');
  //       cb();
  //     }, 1000)
  //   });
  // }

  apply (compiler) {
    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('emit done.');
          resolve();
        }, 1000);
      });
    });
  }
}

module.exports = AsyncPlugin;