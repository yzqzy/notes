# Electron

## Electron 技术架构

Electron 由 Chromium、Node.js、Native apis 构成。

### Chromium

支持最新特性的浏览器

### Node.js

javascript 运行时，可实现文件读写等功能

### Native apis

提供统一的原生界面能力

## Electron 工作流程

Electron  Renderer Process 通过 Main Process 调用 Native apis（Linux、MacOS、Windows）。

### 主进程

可以看作是 package.json 中 main 属性对应的文件。

一个应用只能存在一个主进程，只有主进程可以进行 GUI 的 API 操作。

### 渲染进程

windows 中展示的界面通过渲染进程表现。

一个应用可以有多个渲染进程。

## Electron 环境搭建

### 官方示例

```js
// 克隆示例项目仓库
git clone https://github.com/electron/electron-quick-start

// 进入这个仓库
cd electron-quick-start

// 安装依赖并运行
npm install && npm start
```

### 自主搭建

```js
npm init -y

yarn add electron
```

package.json

```js
{
  "name": "electron-start",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "electron": "^15.2.0"
  }
}
```

main.js

```js
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const mainWin = new BrowserWindow({
    width: 600,
    height: 400
  });

  mainWin.loadFile('index.html');

  mainWin.on('close', () => {
    console.log('close.');
  });
});

app.on('window-all-closed', () => {
  console.log('all closed.');
  app.quit();
})
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Electron Start</title>
</head>
<body>
  
  <h2>自定义桌面应用</h2>

</body>
</html>
```

启动

```js
yarn start
```

## Electron 生命周期

