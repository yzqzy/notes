const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

module.exports = function (source) {
  const callback = this.async();
  const imgs = source.match(/url\((\S*)\?__sprite/g);
  const matchedImgs = [];

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i].match(/url\((\S*)\?__sprite/)[1];
    matchedImgs.push(img);
  }

  Spritesmith.run({
    src: matchedImgs
  }, (err, result) => {
    // 关于 fs.writeFileSync, 正常开发，需要使用 emit 方式生成文件（这里用的 loader-runner 没有这个事件）
    fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image);

    source = source.replace(/url\((\S*)\?__sprite/g, (match) => {
      return `url('dist/sprite.jpg'`;
    });

    fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);

    callback(null, source);
  });
}