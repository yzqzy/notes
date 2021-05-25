const { defineGetter, defineSetter } = require('./utils');
const { PROXY_REQUEST_GETTER_KEYS, PROXT_RESPONSE_GETTER_KEYS, PROXT_RESPONSE_SETTER_KEYS } = require('./config');

const proto = {};

const _defineProtoGetter = defineGetter(proto),
      _defineProtoSetter = defineSetter(proto);

const defineRequestGetter = _defineProtoGetter('request'),
      dedineResponseGetter = _defineProtoGetter('response'),
      defineResponseSetter = _defineProtoSetter('response');

PROXY_REQUEST_GETTER_KEYS.forEach(key => {
  defineRequestGetter(key);
});


PROXT_RESPONSE_GETTER_KEYS.forEach(key => {
  dedineResponseGetter(key);
});

PROXT_RESPONSE_SETTER_KEYS.forEach(key => {
  defineResponseSetter(key);
});

module.exports = proto;

/**
 * ctx.path -> ctx.request.path
 * ctx.url -> ctx.request.url
 * Object.defineProperty
 *  Object.__defineGetter__ 拦截获取值
 *  Object.__defineSetter__ 拦截设置值
 */