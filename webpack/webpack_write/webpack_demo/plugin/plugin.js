class MyPlugin {
  apply (compiler) {
    compiler.hooks.run.tap('run', () => {
      console.log('run');
    });
  }
}

module.exports = MyPlugin;