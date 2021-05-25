const HtmlWebpackPlugin = require("html-webpack-plugin");

class InlineResourcePlugin {
  constructor ({reg}) {
    this.reg = reg;
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('InlineResourcePlugin', (compilation) => {
      HtmlWebpackPlugin
        .getHooks(compilation)
        .alterAssetTagGroups
        .tapAsync('alterAsset', (data, cb) => {
            data = this.processTags(data, compilation);
            cb(null, data);
        });
    });
  }

  processTags (data, compilation) {
    let headTags = [],
        bodyTags = [];

    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation));
    });

    return {...data, headTags, bodyTags}
  }

  processTag (tag, compilation) {
    let { tagName, attributes: { href, src } = {} } = tag;

    let newTag,
        url;

    if (tagName === 'link' && this.reg.test(href)) {
      newTag = {
        tagName: 'style'
      };
      url = href;
    }

    if (tagName === 'script' && this.reg.test(src)) {
      newTag = {
        tagName: 'script'
      };
      url = src;
    }

    if (url) {
      newTag.innerHTML = compilation.assets[url].source();
      delete compilation.assets[url];
      return newTag;
    }

    return tag;
  }
}

module.exports = InlineResourcePlugin;