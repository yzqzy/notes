const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'));

describe('webpack-desigin test case', () => {
  require('./unit/webpack-base-test');
  require('./unit/webpack-prod-test');
});