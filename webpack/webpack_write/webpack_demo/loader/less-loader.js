let less = require('less');

function loader (sourceCode) {
  let css = '';

  less.render(sourceCode, function (err, output) {
    css = output.css;
  });

  css = css.replace(/\n/g, '\\n');

  return css;
}

module.exports = loader;