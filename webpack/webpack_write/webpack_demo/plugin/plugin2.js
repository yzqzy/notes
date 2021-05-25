class MyPlugin2 {
  apply (compiler) {
    compiler.hooks.afterCompile.tap('afterCompile', () => {
      console.log('afterCompile');
    });
  }
}

module.exports = MyPlugin2;