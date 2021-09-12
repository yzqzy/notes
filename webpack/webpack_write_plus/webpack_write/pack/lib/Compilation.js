const path = require('path');
const async = require('neo-async');
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
    const dependencies = module.dependencies;

    async.forEach(dependencies, (dependency, done) => {
      this.createModule({
        parser,
        name: dependency.name,
        context: dependency.context,
        rawRequest: dependency.rawRequest,
        moduleId: dependency.moduleId,
        resource: dependency.resource
      }, null, done);
    }, callback);
  }

  _addModuleChain (context, entry, name, callback) {
    this.createModule({
      name,
      context,
      parser,
      rawRequest: entry,
      resource: path.posix.join(context, entry),
      moduleId: './' + path.posix.relative(context, path.posix.join(context, entry))
    }, (entryModule) => {
      this.entries.push(entryModule);
    }, callback);
  }

  /**
   * @description 定义一个创建模块的方法，复用
   * @param {*} data 创建模块时所需要的一些配置 
   * @param {*} doAddEntry 可选参数，加载入口模块时，将入口模块的 id 写入 this.entries
   * @param {*} callback 
   */
  createModule (data, doAddEntry, callback) {
    let module = normalModuleFactory.create(data);

    const afterBuild = (err, module) => {
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

    this.buildModule(module, afterBuild);

    // 完成本次 build 之后，将 Module 进行保存
    doAddEntry && doAddEntry(module);
    this.modules.push(module);
  }

  // 完成模块编译操作
  addEntry (context, entry, name, callback) {
    this._addModuleChain(context, entry, name, (err, module) => {
      callback(err, module);
    });
  }
}

module.exports = Compilation;