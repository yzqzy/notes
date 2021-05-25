 
vite 需要高版本浏览器支持，内部使用ES Module语法。

开发环境的工具，打开一个开发版本的服务器。

生产版本依旧使用rollup进行编译。

npm install -g create-vite-app

create-vite-app vue_vite

第一次启动稍慢，会创建缓存文件。

  node_modules/.vite_opt_cache

vite 依旧存在热更新功能。

network模板中 Response 可以看到给部分引用路径添加了@/modules/前缀。


vite 
  
  关联命令到全局

  ```js
  npm link
  ```

  安装koa作为服务器

  ```js
  npm i koa
  ```

  ```js
  npm i koa-static
  ```

  ```js
  npm i es-module-lexer // 获取所有的import语法
  ```

  ```js
  npm i magic-string // 
  ```

vue_vite_demo

```js
npm run _dev
```

