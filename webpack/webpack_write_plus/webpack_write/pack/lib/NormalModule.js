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
}

module.exports = NormalModule;