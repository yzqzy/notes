const Koa = require('koa');

const { serveStaticPlugin } = require('./plugins/serverPluginServeStatic'),
      { moduleRewritePlugin } = require('./plugins/serverPluginModuleRewrite'),
      { moduleResolvePlugin } = require('./plugins/serverPluginModuleResolve'),
      { htmlRewritePlugin } = require('./plugins/serverPluginHtml'),
      { vuePlugin } = require('./plugins/serverPluginVue');


function createServer () {
  const app = new Koa();

  const root = process.cwd(), // 获取当前工作目录（执行脚本的目录）
        context = {
          app,
          root
        };

  const resolvedPlugins = [
    htmlRewritePlugin,
    moduleRewritePlugin,
    moduleResolvePlugin,
    vuePlugin,
    serveStaticPlugin
  ];

  resolvedPlugins.forEach(plugin => plugin(context));

  return app;
}

module.exports = createServer;