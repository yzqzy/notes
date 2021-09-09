const EntryOptionPlugin = require('./EntryOptionPlugin');

class WebpackOptionApply {
  process (options, compiler) {
    new EntryOptionPlugin().apply(compiler);
  }
}

module.exports = WebpackOptionApply;