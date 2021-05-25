const fs = require('fs');
const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const VueServerRenderer = require('vue-server-renderer');

const app = new Koa();
const router = new Router();

let clientManifest = require('./dist/vue-ssr-client-manifest.json');
let serverBundle = require('./dist/vue-ssr-server-bundle.json');
let template = fs.readFileSync('./dist/index.ssr.html', 'utf-8');

const renderer = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest
});

router.get('(.*)', async ctx => {
  try {
    ctx.body = await renderer.renderToString({
      url: ctx.url
    });
  } catch (error) {
    console.log(error);
    ctx.body = 'PAGE NOT FOUND';
  }
});

app.use(serve(path.resolve(__dirname, 'dist')));
app.use(router.routes());

app.listen(3000, () => {
  console.log('listen 3000 port.');
});

