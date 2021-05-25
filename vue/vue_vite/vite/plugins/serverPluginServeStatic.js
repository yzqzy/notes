const static = require('koa-static'),
      path = require('path');

function serveStaticPlugin ({ app, root }) {
  // 构建静态资源文件夹
  app.use(static(root));
  app.use(static(path.join(root, 'public')))
}

exports.serveStaticPlugin = serveStaticPlugin;