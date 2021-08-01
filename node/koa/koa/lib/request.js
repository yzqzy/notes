const url = require('url');

module.exports = {
  get path () {
    return url.parse(this.req.url).pathname;
  },

  get url () {
    return this.req.url
  }
}