module.exports = class MyPlugin {
  constructor (options) {
    this.options = options;
  }

  apply (compiler) {
    console.log('plugin options', this.options);
  }
}