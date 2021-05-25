const fs = require('fs').promises;
const { resolveVue } = require('./utils');

const modulesReg = /^\/@modules\//;

/**
 * @description 模块解析
 * @return {void}
 */
function moduleResolvePlugin ({ app, root }) {
  const vueResolved = resolveVue(root); // 执行脚本的路径

  app.use(async (ctx, next) => {
    if (!modulesReg.test(ctx.path)) return next();

    const id = ctx.path.replace(modulesReg, '');

    const content = await fs.readFile(vueResolved[id], 'utf-8');
    
    ctx.type = 'js';
    ctx.body = content;
  });
}

exports.moduleResolvePlugin = moduleResolvePlugin;