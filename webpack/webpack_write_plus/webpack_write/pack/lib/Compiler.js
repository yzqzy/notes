const {
  Tapable,
  AsyncSeriesHook,
  SyncBailHook,
  SyncHook,
  AsyncParallelBailHook
} = require('tapable');
const path = require('path');
const mkdirp = require('mkdirp');
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
      afterCompile: new AsyncSeriesHook(['compilation']),

      emit: new AsyncSeriesHook(['compilation'])
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

  emitAssets (compilation, callback) {
    // 定义工具方法，用于文件生成操作
    const emitFiles = (err) => {
      const assets = compilation.assets;
      const outputPath = this.options.output.path;
      
      for (let file in assets) {
        const source = assets[file];
        const targetPath = path.posix.join(outputPath, file);

        this.outputFileSystem.writeFileSync(targetPath, source, 'utf8');
      }

      callback(err);
    }

    // 创建目录，准备文件写入
    this.hooks.emit.callAsync(compilation, (err) => {
      mkdirp.sync(this.options.output.path);
      emitFiles();
    });
  }

  run (callback) {
    const finalCallback = function (err, status) {
      callback(err, status);
    }

    const onCompiled = (err, compilation) => {
      // 将处理好的 chunk 写入到指定的文件，然后输入至 dist 目录
      this.emitAssets(compilation, (err) => {
        finalCallback(err, new Stats(compilation));
      });
    }

    this.hooks.beforeRun.callAsync(this, (err) => {
      this.hooks.run.callAsync(this, (err) => {
        this.compile(onCompiled);
      });
    });
  }
}

module.exports = Compiler;