const {
  Tapable,
  AsyncSeriesHook,
  SyncBailHook,
  SyncHook,
  AsyncParallelBailHook
} = require('tapable');
const Stats = require('./Stats');
const NormalModuleFactory = require('./NormalModuleFactory');
const Compilation = require('./Compilation');

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

  newCompilationParams () {
    const params = {
      normalModuleFactory: new NormalModuleFactory()
    }
    return params;
  }

  createCompilation () {
    return new Compilation(this);
  }

  newCompilation (params) {
    const compilation = this.createCompilation();
    this.hooks.thisCompilation.call(compilation, params);
    this.hooks.compilation.call(compilation, params);
    return compilation;
  }

  compile (callback) {
    const params = this.newCompilationParams();

    this.hooks.beforeRun.callAsync(params, (err) => {
      this.hooks.compile.call(params);

      const compilation = this.newCompilation(params);

      this.hooks.make.callAsync(compilation, (err) => {
        
        // 开始处理 chunk
        compilation.seal(err => {
          this.hooks.afterCompile.callAsync(compilation, (err) => {
            callback(err, compilation);
          })
        });
      });
    });
  }

  run (callback) {
    const finalCallback = function (err, status) {
      callback(err, status);
    }

    const onCompiled = function (err, compilation) {
      console.log('onCompiled');
      
      // 将处理好的 chunk 写入到指定的文件，然后输入至 dist 目录

      finalCallback(err, new Stats(compilation));
    }

    this.hooks.beforeRun.callAsync(this, (err) => {
      this.hooks.run.callAsync(this, (err) => {
        this.compile(onCompiled);
      });
    });
  }
}

module.exports = Compiler;