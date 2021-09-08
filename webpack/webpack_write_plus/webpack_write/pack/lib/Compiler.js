const {
  Tapable,
  AsyncSeriesHook
} = require('tapable');

class Compiler extends Tapable {
  constructor (context) {
    super();
    this.context = context;
    this.hooks = {
      done: new AsyncSeriesHook(['stats'])
    }
  }

  run (callback) {
    callback && callback(null, {
      toJson () {
        return {
          entries: [], // 入口信息
          chunks: [], // chunk 信息
          modules: [], // 模块信息
          assets: [], // 最终生成资源
        }
      }
    });
  }
}

module.exports = Compiler;