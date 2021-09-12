class Stats {
  constructor (compilation) {
    this.entries = compilation.entries;
    this.modules = compilation.modules;
  }

  toJson () {
    return this;
  }
}

module.exports = Stats;