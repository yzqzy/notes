const SingleEntryPlugin = require('./SingleEntryPlugin');

const itemToPlugin = function (context, item, name) {
  return new SingleEntryPlugin(context, item, name);
}

class EntryOptionPlugin {
  apply (compiler) {
    compiler.hooks.entryOptions.tap('EntryOptionPlugin', (context, entry) => {
      itemToPlugin(context, entry, 'main').apply(compiler);
    });
  }
}

module.exports = EntryOptionPlugin;