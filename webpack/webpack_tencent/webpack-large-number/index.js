if (process.env.NODE_ENV === 'production') {
  modules.exports = require('./dist/large-number.min.js');
} else {
  modules.exports = require('./dist/large-number.js');
}