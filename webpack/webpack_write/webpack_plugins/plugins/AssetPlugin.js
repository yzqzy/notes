class AssetPlugin {
  constructor ({filename}) {
    this.filename = filename;
  }

  apply (compiler) {
    compiler.hooks.emit.tap('AssetPlugin', (compilation) => {
      const assets = compilation.assets;

      let content = `## 文件名    大小\r\n`;

      Object.entries(assets).forEach(([filename, stat]) => {
        content += `- ${filename}  ${stat.size()}\r\n`;
      });

      assets[this.filename] = {
        source () {
          return content;
        },
        size () {
          return content.length;
        }
      }
    });
  }
}

module.exports = AssetPlugin;