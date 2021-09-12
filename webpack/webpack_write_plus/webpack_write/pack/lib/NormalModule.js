class NormalModule {
  constructor (data) {
    this.name = data.name;
    this.entry = data.entry;
    this.rawRequest = data.rawRequest;
    this.parser = data.parser;
    this.resource = data.resource;
    this._source = undefined; // 模块源代码
    this._ast = undefined; // 模块源代码对应的 AST
  }

  getSource (compilation, callback) {
    compilation.inputFileSystem.readFile(this.resource, 'utf-8', callback);
  }

  doBuild (compilation, callback) {
    this.getSource(compilation, (err, source) => {
      this._source = source;
      callback();
    });
  }

  build (compilation, callback) {
    // 从文件中读取需要被加载的 module 内容
    // 如果当前不是 js 模块，则需要 loader 进行处理，最终也是返回 js 模块
    // 上述操作完成之后，就可以将 js 代码转换为 ast 语法树
    // 当且 js 模块内部可能又引用很多其他模块，需要递归处理
    this.doBuild(compilation, (err) => {
      this._ast = this.parser.parse(this._source);
      callback(err);
    });
  }
}

module.exports = NormalModule;