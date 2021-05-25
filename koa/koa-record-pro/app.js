// main - lib - application.js
const Koa = require('../koa');
const { createReadStream } = require('fs');
const { resolve } = require('path');

// class Application 实例化
const app = new Koa();

/**
 * 三个重要的app对象继承来的API
 * listen 监听服务
 * use：注册中间件函数
 * on：监听事件
 */

/**
 * @param {object} ctx - 执行期上下文
 *  包含执行期所需要的所有方法和属性
 *  例如：request、response
 */
app.use((ctx) => {
  console.log(ctx.path); // 封装 代理到 ctx.request.path
  console.log(ctx.url); // 封装 代理到 ctx.request.url
  // console.log(ctx.request.path); // 封装
  // console.log(ctx.request.req.url); // 原生
  // console.log(ctx.req.url); // 原生

  // ctx.body = 'hello';
  // console.log(ctx.body); // 封装 代理到 ctx.response.body
  // console.log(ctx.response.body); // 原生

  // ctx.response.body = 'Hello World';
  // ctx.body = 'hello koa';
  // ctx.body = {
  //   a: 1,
  //   b: 2
  // };
  // ctx.body = [
  //   {
  //     a: 1,
  //     b: 2
  //   },
  //   {
  //     a: 3,
  //     b: 4
  //   }
  // ];
  // ctx.set('Content-Type', 'text/html');
  ctx.body = createReadStream(resolve(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('listen 3000');
});