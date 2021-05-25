const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base');

  console.log(baseConfig);

  it ('enrty', () => {
    assert.deepStrictEqual(baseConfig.entry.index.indexOf('webpack-design/test/smoke/template/src/pages/index/index.js') > -1, true);
    assert.deepStrictEqual(baseConfig.entry.search.indexOf('webpack-design/test/smoke/template/src/pages/search/index.js') > -1, true);
  });
});