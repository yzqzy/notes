const path = require('path');
const { Tapable, SyncHook } = require('tapable');
const NormalModuleFactory = require('./NormalModuleFactory');
const Parser = require('./Parser');

const normalModuleFactory = new NormalModuleFactory();
const parser = new Parser();

class Compilation extends Tapable {
  constructor (compiler) {
    super();
    this.compiler = compiler;
    this.context = compiler.context;
    this.options = compiler.options;
    this.inputFileSystem = compiler.inputFileSystem;
    this.outputFileSystem = compiler.outputFileSystem;
    this.entries = []; // 存放所有入口模块数组
    this.modules = []; // 存放所有模块数组
    this.hooks = {
      successModule: new SyncHook(['module'])
    }
  }

  // 完成具体的 build 行为
  buildModule (module, callback) {
    module.build(this, (err) => {
      // module 编译完成
      this.hooks.successModule.call(module);
      callback(err);
    });
  }

  _addModuleChain (context, entry, name, callback) {
    let entryModule = normalModuleFactory.create({
      name,
      context,
      rawRequest: entry,
      resource: path.posix.join(context, entry), // 返回 entry 入口的绝对路径
      parser
    });

    const afterBuild = function (err) {
      callback(err, entryModule);
    }

    this.buildModule(entryModule, afterBuild);

    // 完成本次 build 之后，将 Module 进行保存
    this.entries.push(entryModule);
    this.modules.push(entryModule);
  } 

  // 完成模块编译操作
  addEntry (context, entry, name, callback) {
    this._addModuleChain(context, entry, name, (err, module) => {
      callback(err, module);
    });
  }
}

module.exports = Compilation;