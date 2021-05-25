## 编写命令

```json
"bin": {
  "vue-cli": "./bin/www"
},
```

## 命令链接到全局

```js
npm link
```

## 执行命令

```js
vue-cli
```

## 读取参数

```js
npm i commander --save-dev
```

```js
const  { program } = require('commander');
const { version } = require('../package.json');

program.version(version).parse(process.argv);
```

```js
vue-cli --help
```

## axios请求模板数据

```js
npm install axios --save-dev
```

## 加载动效

```js
npm install ora inquirer --save-dev
```

## 下载github包

```js
npm install download-github-repo --save-dev
```

## 复制本地文件夹 - 简单项目创建完成

```js
npm i ncp --save-dev
```

## 遍历文件夹

```js
npm i metalsmith --save-dev
```

## 获取模板引擎渲染方法

```js
npm i consolidate ejs --save-dev
```