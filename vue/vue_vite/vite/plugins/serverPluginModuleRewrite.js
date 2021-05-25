const { readBody } = require('./utils'),
      { parse } = require('es-module-lexer'),
      MagicString = require('magic-string');

function rewirteimports (source) {
  let imports = parse(source)[0],
      magicString = new MagicString(source);

  if (imports.length) {
    for (let i = 0; i < imports.length; i++) {
      let { s: start, e: end } = imports[i];

      let id = source.substring(start, end);

      if (/^[^\/\.]/.test(id)) {
        id = `/@modules/${id}`;
        // vue -> /@modules/vue
        magicString.overwrite(start, end, id);
      }
    }
  }

  return magicString.toString();
}

/**
 * @description 模块路径重写
 * @param {object} 
 * @return {void}
 */
function moduleRewritePlugin ({ app, root }) {
  app.use(async (ctx, next) => {
    await next();

    if (ctx.body && ctx.response.is('js')) {
      const content = await readBody(ctx.body);
      const result = rewirteimports(content);
      ctx.body = result;
    }
  });
}

exports.moduleRewritePlugin = moduleRewritePlugin;