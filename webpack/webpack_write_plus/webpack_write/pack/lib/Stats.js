class Stats {
  constructor (compilation) {
    this.entries = compilation.entries;
    this.modules = compilation.modules;
    this.chunks = compilation.chunks;
  }

  toJson () {
    return this;
  }
}

module.exports = Stats;