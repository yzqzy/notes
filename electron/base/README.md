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

### 生命周期事件

* ready：app 初始化完成
* dom-ready：一个窗口中的文本加载完成
* did-finsh-load：导航完成时触发
* window-all-closed：所有窗口都被关闭时触发
  * 如果注册该回调函数，但是不调用 quit 方法，后续事件将会失效
* before-quit：关闭窗口之前触发
* will-quit：窗口关闭并且应用退出后触发
* quit：当所有窗口被关闭时触发
* closed：当窗口关闭时触发，此时应删除窗口引用

```js
const { app, BrowserWindow } = require('electron');

function createWindow () {
  let mainWin = new BrowserWindow({
    width: 600,
    height: 400
  });

  mainWin.loadFile('index.html');

  mainWin.webContents.on('did-finish-load', () => {
    console.log('browser window did-finish-load.');
  });

  mainWin.webContents.on('dom-ready', () => {
    console.log('browser window dom-ready.');
  });

  mainWin.on('close', () => {
    console.log('browser window close.');
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  console.log('all closed.');
  app.quit();
});

app.on('before-quit', () => {
  console.log('before-quit.');
});

app.on('will-quit', () => {
  console.log('will-quit.');
});

app.on('quit', () => {
  console.log('quit.');
});

// browser window dom-ready.
// browser window did-finish-load.
// browser window close.
// all closed.
// before-quit.
// will-quit.  
// quit.  
```

## 窗口尺寸

BrowserWindow

```js
function createWindow () {
  let mainWin = new BrowserWindow({
    x: 0,
    y: 0,
    show: false, // 默认为 true，创建一个窗口对象之后会显示，设置为 false 不会显示
    width: 800,
    height: 400,
    maxWidth: 1000,
    maxHeight: 600,
    minWidth: 600,
    minHeight: 200,
    resizable: false, // 窗口是否可伸缩
  });

  mainWin.loadFile('index.html');
  
  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });
}
```

## 窗口标题及环境

```js
let mainWin = new BrowserWindow({
  x: 0,
  y: 0,
  show: false,
  width: 1200,
  height: 600,
  maxWidth: 2400,
  maxHeight: 800,
  minWidth: 600,
  minHeight: 200,
  resizable: false,
  frame: true, // 用于自定义 menu，设置为 false 可以将默认的菜单栏隐藏
  autoHideMenuBar: true,
  title: 'Electron First App', // 自定义应用标题
  icon: 'favicon.ico', // 设置自定义当前应用的显示图标
});
```

