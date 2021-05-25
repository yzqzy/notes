const loaderUtils = require('loader-utils'),
mime = require('mime');

function loader (sourceCode) {
  const options = loaderUtils.getOptions(this),
        limit = options.limit;

  if (limit && limit > sourceCode.length) {
    return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${sourceCode.toString('base64')}"`;
  } else {
    return require('./file-loader').call(this, sourceCode);
  }
}

loader.raw = true;

module.exports = loader;