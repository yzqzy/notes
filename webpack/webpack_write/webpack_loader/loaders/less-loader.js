let less = require('less');

function loader (sourceCode) {
  let css;

  less.render(sourceCode, (err, res) => {
    css = res.css;
  });

  return css;
}

module.exports = loader;