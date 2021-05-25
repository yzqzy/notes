const loaderUtils = require('loader-utils'),
      validate = require('schema-utils'),
      fs = require('fs');

function loader (sourceCode) {
  // this.cacheable(false);

  const options = loaderUtils.getOptions(this),
        cb = this.async();

  const schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  };

  validate(schema, options, 'banner-loader');

  const { filename, text } = options;

  if (filename) {
    this.addDependency(filename);

    fs.readFile(filename, 'utf-8', (err, data) => {
      cb(err, `/**${data}*/${sourceCode}`)
    });
  } else {
    cb(null, `/**${text}*/${sourceCode}`)
  }

  return sourceCode;
}

module.exports = loader;