const Kao = require('koa');
const fs = require('fs');
const { resolve } = require('path');

const app = new Kao();

app.use((ctx, next) => {
  const listStr = `
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  `;

  let htmlStr = fs.readFileSync(resolve(__dirname, 'index.html'), 'utf-8');

  htmlStr = htmlStr.replace(/\{\{(.*?)\}\}/, listStr);


  fs.writeFileSync(resolve(__dirname, 'index.html'), htmlStr);

  ctx.set('Content-Type', 'text/html');
  ctx.body = fs.createReadStream(resolve(__dirname, 'index.html'));
});

app.listen(3000);