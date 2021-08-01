const http = require('http');
const Stream = require('stream');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const { typeOf } = require('./utils');
const { STATUS_CODE } = require('./config');

class Application {
  constructor () {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use (callback) {
    this.callback = callback;
  }

  listen (...args) {
    const httpService = http.createServer(this.handleHttpRequest.bind(this));
    httpService.listen(...args);
  }

  handleHttpRequest (req, res) {
    const ctx = this.createContext(req, res);
    this.callback(ctx);

    const _body = ctx.response.body;

    if (typeOf(_body) === 'string' || Buffer.isBuffer(_body)) {
      res.end(_body);
    } else if (_body instanceof Stream) {
      res.setHeader('Content-Disposition', 'attachment;filename:' + encodeURIComponent('Download File'));
      _body.pipe(res);
    } else if (typeOf(_body) === 'Object' || typeOf(_body) === 'Array') {
      res.end(JSON.stringify(_body));
    } else {
      ctx.res.statusCode = 404;
      res.end(STATUS_CODE[404]);
    }
  }

  createContext (req, res) {
    const ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.request.req = ctx.req = req;
    ctx.response.res = ctx.res = res;
    return ctx;
  }
}

module.exports = Application;