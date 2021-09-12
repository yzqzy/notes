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
      callback(err, module);
    });
  }

  processDependcies (module, callback) {
    // 当前的函数的功能就是实现一个被依赖模块的递归加载
    // 加载模块的思路都是创建一个模块，然后将加载到的模块内容拿进来
    // 当前并不知道 module 需要依赖几个模块，此时需要想办法让所有被依赖的模块都加载完成之后再执行 callback（neo-async）
    
  }

  _addModuleChain (context, entry, name, callback) {
    let entryModule = normalModuleFactory.create({
      name,
      context,
      rawRequest: entry,
      resource: path.posix.join(context, entry), // 返回 entry 入口的绝对路径
      parser
    });

    const afterBuild = function (err, module) {
      // 我们需要判断当前 module 存在依赖 
      if (module.dependencies.length > 0) {
        // 当前逻辑表示存在需要依赖加载的模块，我们可以单独定义一个方法实现
        this.processDependcies(module, (err) => {
          callback(err, module);
        });
      } else {
        callback(err, module);
      }
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