class Chunk {
  constructor (entryModule) {
    this.entryModule = entryModule;
    this.name = entryModule.name;
    this.files = []; // 记录 chunk 的文件信息
    this.modules = []; // 记录 chunk 包含的模块
  }
}

module.exports = Chunk;