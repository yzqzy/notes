const fs = require('fs');

class NodeEnvironmentPlugin {
  constructor (options) {
    this.options = options || {};
  }

  apply (compiler) {
    compiler.inputFileSystem = fs;
    compiler.outputFileSystem = fs;
  }
}

module.exports = NodeEnvironmentPlugin;