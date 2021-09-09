const EntryOptionPlugin = require('./EntryOptionPlugin');

class WebpackOptionApply {
  process (options, compiler) {
    new EntryOptionPlugin().apply(compiler);
    compiler.hooks.entryOption.call(options.context, options.entry);
  }
}

module.exports = WebpackOptionApply;