const {
  Tapable,
  AsyncSeriesHook,
  SyncBailHook,
  SyncHook,
  AsyncParallelBailHook
} = require('tapable');

class Compiler extends Tapable {
  constructor (context) {
    super();
    this.context = context;
    this.hooks = {
      done: new AsyncSeriesHook(['stats']),
      entryOption: new SyncBailHook(['context', 'entry']),

      beforeRun: new AsyncSeriesHook(["compiler"]),
			run: new AsyncSeriesHook(["compiler"]),

      thisCompilation: new SyncHook(["compilation", "params"]),
      compilation: new SyncHook(["compilation", "params"]),

      beforeCompile: new AsyncSeriesHook(['params']),
      compile: new SyncHook(['params']),
      make: new AsyncParallelBailHook(['compilation']),
      afterCompile: new AsyncSeriesHook(['compilation'])
    }
  }

  compile () {
    console.log('compile');
  }

  run (callback) {
    const finalCallback = function (err, status) {
      callback(err, status);
    }

    const onCompiled = function (err, compilation) {
      console.log('onCompiled');

      finalCallback(err, {
        toJson () {
          return {
            entries: [],
            chunks: [],
            module: [],
            assets: []
          }
        }
      })
    }

    this.hooks.beforeRun.callAsync(this, (err) => {
      this.hooks.run.callAsync(this, (err) => {
        this.compile(onCompiled);
      });
    });
  }
}

module.exports = Compiler;