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

### 窗口标题

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

### 打开子窗口

remote 模块后续不建议使用，这里只是通过 remote 模块进行演示。

> 目前最新 electron 已不再支持 remote api，可以安装  **^11.2.1** 版本体验此功能。

**main.js**

```js
const { app, BrowserWindow } = require('electron');

function createWindow () {
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
    frame: true,
    autoHideMenuBar: true,
    title: 'Electron First App',
    icon: 'favicon.ico',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWin.loadFile('index.html');

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  console.log('all closed.');
  app.quit();
});

app.on('quit', () => {
  console.log('quit.');
});

```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>
<body>
  
  <h2>Electron</h2>
  <button id="J-btn">打开新窗口</button>

  <script src="index.js"></script>

</body>
</html>
```

**index.js**

```js
const { remote } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    // 点击按钮打开新窗口

    let newWin = new remote.BrowserWindow({
      width: 200,
      height: 200
    });

    newWin.loadFile('newindex.html'),

    newWin.on('close', () => {
      newWin = null
    });
  })
});
```

**newindex.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>子窗口</title>
</head>
<body>

  <h3>子窗口内容</h3>
  
</body>
</html>
```

## 自定义窗口

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>自定义窗口</title>
  <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .box {
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background-color: seashell;
    }

    .bar {
      height: 40px;
      box-shadow: 0 1 5px 0px #333;
      border-bottom: 1px solid #ccc;
    }

    .titleBar {
      width: 190px;
      float: left;
      height: 40px;
      margin-left: 10px;
    }

    .titleBar div {
      float: left;
      height: 40px;
    }

    .titleBar .logo {
      width: 20px;
      height: 20px;
      margin-top: 10px;
      background: url('./favicon.ico') 0 0 no-repeat;
      background-size: cover;
    }

    .titleBar .title {
      margin-left: 10px;
      font: normal 14px/40px '微软雅黑'
    }

    .windowTool {
      float: right;
      width: 600px;
      height: 40px;
      position: relative;
    }

    .windowTool div {
      float: right;
      cursor: pointer;
      margin-right: 20px;
      font: normal 12px/40px '微软雅黑'
    }
  </style>
</head>

<body>
  <div class="box">
    <div class="bar">
      <div class="titleBar">
        <div class="logo"></div>
        <div class="title">月落个人博客</div>
      </div>
      <div class="windowTool">
        <div class="close">
          <i class="fa fa-window-close-o" aria-hidden="true"></i>
        </div>
        <div class="maxsize">
          <i class="fa fa-window-maximize" aria-hidden="true"></i>
        </div>
        <div class="minisize">
          <i class="fa fa-minus"></i>
        </div>
      </div>
    </div>
    <div>主体内容</div>
  </div>

  <script src="index.js"></script>

</body>

</html>
```

main.js

```js
const { app, BrowserWindow } = require('electron');

function createWindow () {
  let mainWin = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWin.loadFile('index.html');

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  console.log('all closed.');
  app.quit();
});

app.on('quit', () => {
  console.log('quit.');
});
```

index.js

```js
const { remote } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  let mainWin = remote.getCurrentWindow();

  let oWinTool = document.getElementsByClassName('windowTool')[0];
  let oCloseBtn = oWinTool.getElementsByClassName('close')[0],
      oMaxsizeBtn = oWinTool.getElementsByClassName('maxsize')[0],
      oMinsizeBtn = oWinTool.getElementsByClassName('minisize')[0];

  oCloseBtn.addEventListener('click', () => {
    mainWin.close();
  });
  oMaxsizeBtn.addEventListener('click', () => {
    if (!mainWin.isMaximized()) {
      mainWin.maximize();
    } else {
      mainWin.restore();
    }
  });
  oMinsizeBtn.addEventListener('click', () => {
    if (!mainWin.isMinimized()) {
      mainWin.minimize();
    } else {
      mainWin.restore();
    }
  });
});
```

## 阻止窗口关闭

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>自定义窗口</title>
  <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .box {
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background-color: seashell;
    }

    .bar {
      height: 40px;
      box-shadow: 0 1 5px 0px #333;
      border-bottom: 1px solid #ccc;
    }

    .titleBar {
      width: 190px;
      float: left;
      height: 40px;
      margin-left: 10px;
    }

    .titleBar div {
      float: left;
      height: 40px;
    }

    .titleBar .logo {
      width: 20px;
      height: 20px;
      margin-top: 10px;
      background: url('./favicon.ico') 0 0 no-repeat;
      background-size: cover;
    }

    .titleBar .title {
      margin-left: 10px;
      font: normal 14px/40px '微软雅黑'
    }

    .windowTool {
      float: right;
      width: 600px;
      height: 40px;
      position: relative;
    }

    .windowTool div {
      float: right;
      cursor: pointer;
      margin-right: 20px;
      font: normal 12px/40px '微软雅黑'
    }

    .isClose {
      top: 50%;
      left: 50%;
      width: 380px;
      height: 180px;
      padding: 10px;
      position: fixed;
      display: none;
      background: #f5f5f5;
      box-shadow: 0px 1px 5px 0px #ccc;
      transform: translate(-50%, -50%);
    }

    .isClose h3 {
      text-align: center;
      font: bold 14px/40px '微软雅黑';
    }

    .isClose p {
      font: normal 12px/40px '微软雅黑'
    }

    .close_btn {
      margin-top: 60px;
      margin-left: 220px;
    }

    .close_btn span {
      float: left;
      width: 60px;
      margin-left: 8px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid #ccc;
      font: normal 12px/26px '微软雅黑';
    }

    .close_btn span:nth-child(1) {
      cursor: pointer;
      color: #fff;
      background-color: #7b8c7c;
    }
  </style>
</head>

<body>
  <div class="box">
    <div class="bar">
      <div class="titleBar">
        <div class="logo"></div>
        <div class="title">月落个人博客</div>
      </div>
      <div class="windowTool">
        <div class="close">
          <i class="fa fa-window-close-o" aria-hidden="true"></i>
        </div>
        <div class="maxsize">
          <i class="fa fa-window-maximize" aria-hidden="true"></i>
        </div>
        <div class="minisize">
          <i class="fa fa-minus"></i>
        </div>
      </div>
    </div>
    <div>主体内容</div>

    <!-- 定义浮窗设置阻止窗口关闭样式 -->
    <div class="isClose">
      <h3>是否关闭当前应用？</h3>
      <p>系统可能不会保存您的所有更改</p>
      <p class="close_btn"><span>是</span><span>否</span></p>
    </div>
  </div>

  <script src="index.js"></script>

</body>

</html>
```

index.js

```js
const { remote } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  let mainWin = remote.getCurrentWindow();

  let oWinTool = document.getElementsByClassName('windowTool')[0];
  let oCloseBtn = oWinTool.getElementsByClassName('close')[0],
      oMaxsizeBtn = oWinTool.getElementsByClassName('maxsize')[0],
      oMinsizeBtn = oWinTool.getElementsByClassName('minisize')[0];

  oCloseBtn.addEventListener('click', () => {
    mainWin.close();
  });
  oMaxsizeBtn.addEventListener('click', () => {
    if (!mainWin.isMaximized()) {
      mainWin.maximize();
    } else {
      mainWin.restore();
    }
  });
  oMinsizeBtn.addEventListener('click', () => {
    if (!mainWin.isMinimized()) {
      mainWin.minimize();
    } else {
      mainWin.restore();
    }
  });

  window.onbeforeunload = function () {
    let oBox = document.getElementsByClassName('isClose')[0];

    oBox.style.display = 'block';

    let yesBtn = oBox.getElementsByTagName('span')[0],
        noBtn = oBox.getElementsByTagName('span')[1];
    
    yesBtn.addEventListener('click', () => {
      mainWin.destroy();
    });
    
    noBtn.addEventListener('click', () => {
      oBox.style.display = 'none';
    });

    return false;
  }
});
```

## 模态窗口

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
</head>

<body>

  <h2>子窗口及模态窗口</h2>

  <button id="J-btn">新增窗口</button>

  <script src="index.js"></script>

</body>

</html>
```

main.js

```js
const { app, BrowserWindow } = require('electron');

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWin.loadFile('index.html');

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
```

index.js

```js
const { remote } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const mainWin = remote.getCurrentWindow();
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    let subWin = new remote.BrowserWindow({
      parent: mainWin,
      modal: true,
      width: 200,
      height: 200
    });

    subWin.loadFile('sub.html');

    subWin.on('close', () => {
      subWin = null;
    })
  })
});
```

## 自定义菜单

main.js

```js
const { app, BrowserWindow, Menu } = require('electron');

console.log(process.platform)

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  // 自定义菜单项
  const menuItems = [
    {
      label: '文件',
      submenu: [
        {
          label: '打开文件',
          click () {
            console.log('open file.');
          }
        },
        {
          type: 'separator'
        },
        {
          label: '关闭文件夹'
        },
        {
          label: '关于',
          role: 'about'
        }
      ]
    },
    {
      label: '编辑'
    }
  ];
  // 创建菜单
  const menu = Menu.buildFromTemplate(menuItems);
  // 将菜单添加至窗体中
  Menu.setApplicationMenu(menu);

  mainWin.loadFile('index.html');

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
```

## 菜单角色及类型

```js
const { app, BrowserWindow, Menu } = require('electron');

console.log(process.platform)

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  // 自定义菜单项
  const menuItems = [
    {
      label: '角色',
      submenu: [
        {
          label: '复制',
          role: 'copy'
        },
        {
          label: '剪切',
          role: 'cut'
        },
        {
          label: '粘贴',
          role: 'paste'
        },
        {
          label: '最小化',
          role: 'minimize'
        }
      ]
    },
    {
      label: '类型',
      submenu: [
        {
          label: '选项1',
          type: 'checkbox'
        },
        {
          label: '选项2',
          type: 'checkbox'
        },
        {
          label: '选项3',
          type: 'checkbox'
        },
        {
          type: 'separator'
        },
        {
          label: 'item1',
          type: 'radio'
        },
        {
          label: 'item2',
          type: 'radio'
        },
        {
          type: 'separator'
        },
        {
          label: 'windows',
          type: 'submenu',
          role: 'windowMenu'
        }
      ]
    },
    {
      label: '自定义快捷键',
      submenu: [
        {
          label: '打开',
          accelerator: 'ctrl + o',
          click () {
            console.log('process open');
          }
        }
      ]
    }
  ];
  // 创建菜单
  const menu = Menu.buildFromTemplate(menuItems);
  // 将菜单添加至窗体中
  Menu.setApplicationMenu(menu);

  mainWin.loadFile('index.html');

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
```

## 动态创建菜单

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
</head>

<body>

  <h2>自定义菜单</h2>

  <button id="J-add-menu">创建自定义菜单</button>
  <br>
  <br>
  <input type="text" placeholder="输入自定义菜单项内容" id="J-menu-con">
  <br>
  <br>
  <button id="J-add-item">添加菜单项</button>

  <script src="index.js"></script>

</body>

</html>
```

main.js

```js
const { app, BrowserWindow } = require('electron');

console.log(process.platform)

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWin.loadFile('index.html');

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
```

index.js

```js
const { remote } = require('electron');
const { Menu, MenuItem } = remote;

window.addEventListener('DOMContentLoaded', () => {
  const mainWin = remote.getCurrentWindow();
  const oAddMenu = document.getElementById('J-add-menu');
  const oMenuCon = document.getElementById('J-menu-con');
  const oAddItem = document.getElementById('J-add-item');

  let subMenu = new Menu();

  // 生成自定义菜单
  oAddMenu.addEventListener('click', () => {
    const menuFile = new MenuItem({
      label: '文件',
      type: 'normal'
    });
    const menuEdit = new MenuItem({
      label: '编辑',
      type: 'normal'
    });
    const customMenu = new MenuItem({
      label: '自定义菜单项',
      submenu: subMenu
    });

    const menu = new Menu();
    
    menu.append(menuFile);
    menu.append(menuEdit);
    menu.append(customMenu);

    Menu.setApplicationMenu(menu);
  });

  // 动态添加菜单项
  oAddItem.addEventListener('click', () => {
    const content = oMenuCon.value.trim();

    if (content) {
      subMenu.append(new MenuItem({
        label: content,
        type: 'normal'
      }));
      oMenuCon.value = '';
    }
  });
});
```

## 自定义右键菜单

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
</head>

<body>

  <h2>右键菜单</h2>

  <script src="index.js"></script>

</body>

</html>
```

main.js

```js
const { app, BrowserWindow } = require('electron');

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWin.loadFile('index.html');

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
```

index.js

```js
const { remote } = require('electron');
const { Menu, MenuItem } = remote;

const contextMenuItems = [
  { label: 'Run Code' },
  { label: '转到定义' },
  { type: 'separator' },
  {
    label: '其他',
    click () {
      console.log('clicked.');
    }
  },
]

window.addEventListener('DOMContentLoaded', () => {
  const menu = Menu.buildFromTemplate(contextMenuItems);

  window.addEventListener('contextmenu', ev => {
    ev.preventDefault();

    menu.popup({
      window: remote.getCurrentWindow()
    });
  });
});
```

## 主进程与渲染进程通信

同步消息、异步消息、互相发消息。

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
</head>

<body>

  <h2>右键菜单</h2>

  <button>渲到主 异步操作</button>
  <br><br>
  <button>渲到主 同步操作</button>

  <script src="index.js"></script>

</body>

</html>
```

main.js

```js
const { app, BrowserWindow, ipcMain, Menu } = require('electron');

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  const menuItems = [
    {
      label: 'send',
      click () {
        // 3. 主进程主动推送消息
        BrowserWindow.getFocusedWindow().webContents.send('mtp', '来自主进程的消息');
      }
    }
  ];

  const menu = Menu.buildFromTemplate(menuItems);
  Menu.setApplicationMenu(menu);

  mainWin.loadFile('index.html');
  mainWin.webContents.openDevTools();

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});


// 1. 主进程接收异步消息
ipcMain.on('msg1', (ev, data) => {
  console.log(data);

  // 回复消息
  ev.sender.send('res1', 'from main process async message');
});

// 2. 主进程接收同步消息
ipcMain.on('msg2', (ev, data) => {
  console.log(data);

  // 回复消息
  ev.returnValue = 'from main process message';
});
```

index.js

```js
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtns = document.getElementsByTagName('button');

  // 1. 异步 API 向主进程发送消息
  oBtns[0].addEventListener('click', () => {
    ipcRenderer.send('msg1', 'from render process async message');
  });
  // 接收主进程异步消息
  ipcRenderer.on('res1', (ev, data) => {
    console.log(data);
  });


  // 2. 同步 API 向主进程发送消息
  oBtns[1].addEventListener('click', () => {
    const ret = ipcRenderer.sendSync('msg2', 'from render process message');

    console.log(ret);
  });


  // 3. 接收主进程主动推送的消息
  ipcRenderer.on('mtp', (ev, data) => {
    console.log(data);
  });
});
```

## 渲染进程间通信

### 基于本地存储

main.js

```js
const { app, BrowserWindow, ipcMain } = require('electron');

let mainWinId = null

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWin.loadFile('index.html');

  mainWinId = mainWin.id

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

// 监听渲染进程消息
ipcMain.on('openWin1', () => {
  let subWin1 = new BrowserWindow({
    width: 400,
    height: 300,
    parent: BrowserWindow.fromId(mainWinId),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  subWin1.loadFile('sub1.html');
  subWin1.on('close', () => {
    subWin1 = null;
  });
});
```

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
</head>

<body>

  <h2>渲染进程通信</h2>

  <button id="J-btn">打开窗口1</button>

  <script src="index.js"></script>

</body>

</html>
```

index.js

```js
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    ipcRenderer.send('openWin1');
    
    localStorage.setItem('name', 'yueluo');
  });
});
```

sub1.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>窗口</title>
</head>
<body>

  <h3>窗口 1</h3>

  <input type="text" id="J-input" />

  <script src="sub1.js"></script>
  
</body>
</html>
```

sub1.js

```js
window.addEventListener('DOMContentLoaded', () => {
  const oInput = document.getElementById('J-input');

  oInput.value = localStorage.getItem('name');
});
```

### 基于主进程

渲染进程向主进程发送消息，然后主进程进行消息转发。

main.js

```js
const { app, BrowserWindow, ipcMain } = require('electron');

let mainWinId = null

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWin.loadFile('index.html');

  mainWinId = mainWin.id

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

// 监听渲染进程消息
ipcMain.on('openWin1', (ev, data) => {
  let subWin1 = new BrowserWindow({
    width: 400,
    height: 300,
    parent: BrowserWindow.fromId(mainWinId),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  subWin1.loadFile('sub1.html');

  subWin1.on('close', () => {
    subWin1 = null;
  });

  // sub 进程窗口对象，内容加载完毕后转发消息
  subWin1.webContents.on('did-finish-load', () => {
    subWin1.webContents.send('its', data);
  });
});


ipcMain.on('stm', (ev, data) => {
  // 信息中转，此时可以依据指定的窗口 ID 获取对应的渲染进程，进行消息发送
  const mainWin = BrowserWindow.fromId(mainWinId);
  mainWin.webContents.send('mti', data);
});
```

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
</head>

<body>

  <h2>渲染进程通信</h2>

  <button id="J-btn">打开窗口1</button>

  <script src="index.js"></script>

</body>

</html>
```

index.js

```js
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    ipcRenderer.send('openWin1', 'form index render process message');
  });

  // 接口消息
  ipcRenderer.on('mti', (ev, data) => {
    console.log(data);
  });
});
```

sub1.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>窗口</title>
</head>
<body>

  <h3>窗口 1</h3>

  <input type="text" id="J-input" />

  <br />

  <button id="J-btn">发送数据</button>

  <script src="sub1.js"></script>
  
</body>
</html>
```

sub1.js

```js
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oInput = document.getElementById('J-input');

  // 发送数据
  const oBtn = document.getElementById('J-btn');
  oBtn.addEventListener('click', () => {
    ipcRenderer.send('stm', 'from sub process message');
  });

  // 接收数据
  ipcRenderer.on('its', (ev, data) => {
    oInput.value = data;
  });
});
```

## dialog 模块

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
</head>

<body>

  <h2>Dialog 模块</h2>

  <button id="J-btn">显示对话框</button>
  <br><br>
  <button id="J-err-btn">显示错误对话框</button>

  <script src="index.js"></script>

</body>

</html>
```

index.js

```js
const { remote } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');
  const oErrorBtn = document.getElementById('J-err-btn');

  oBtn.addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      defaultPath: __dirname,
      title: '选择文件',
      buttonLabel: '请选择',
      properties: ['openFile', 'multiSelections'],
      filters: [
        {
          name: '代码文件',
          extensions: ['js', 'json', 'html']
        },
        {
          name: '图片文件',
          extensions: ['ico', 'jpg', 'png']
        },
        {
          name: '媒体文件',
          extensions: ['avi', 'mp4', 'mp3']
        }
      ]
    })
      .then(ret => {
        console.log(ret);
      })
      .catch(err => console.log(err));
  });

  oErrorBtn.addEventListener('click', () => {
    remote.dialog.showErrorBox('自定义标题', '自定义内容');
  });
});
```

## shell 与 iframe

main.js

```js
const { app, BrowserWindow, Menu, shell } = require('electron');

let mainWinId = null

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  const tmp = [
    {
      label: '菜单',
      submenu: [
        {
          label: '关于',
          click () {
            shell.openExternal('https://yueluo.club')
          }
        },
        {
          label: '打开',
          click () {
            BrowserWindow.getFocusedWindow().webContents.send('openUrl');
          }
        }
      ]
    }
  ];

  const menuIems = Menu.buildFromTemplate(tmp);
  Menu.setApplicationMenu(menuIems);

  mainWin.loadFile('index.html');

  mainWinId = mainWin.id

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
```

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    iframe {
      width: 100%;
      height: 400px;
    }
  </style>
</head>

<body>

  <h2>shell 与 iframe</h2>

  <a id="J-open-url" href="https://www.yueluo.club/">打开URL</a>

  <br><br>

  <button id="J-open-folder">打开目录</button>


  <iframe id="J-webview" src="https://www.yueluo.club/" frameborder="0"></iframe>

  <script src="index.js"></script>

</body>

</html>
```

index.js

```js
const { app, BrowserWindow, Menu, shell } = require('electron');

let mainWinId = null

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  const tmp = [
    {
      label: '菜单',
      submenu: [
        {
          label: '关于',
          click () {
            shell.openExternal('https://yueluo.club')
          }
        },
        {
          label: '打开',
          click () {
            BrowserWindow.getFocusedWindow().webContents.send('openUrl');
          }
        }
      ]
    }
  ];

  const menuIems = Menu.buildFromTemplate(tmp);
  Menu.setApplicationMenu(menuIems);

  mainWin.loadFile('index.html');

  mainWinId = mainWin.id

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
```

## 消息通知

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    iframe {
      width: 100%;
      height: 400px;
    }
  </style>
</head>

<body>

  <h2>基于 H5 实现消息通知</h2>

  <button id="J-btn">触发消息</button>

  <script src="index.js"></script>

</body>

</html>
```

index.js

```js
window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    const options = {
      title: '提示',
      body: '消息通知',
      icon: './favicon.ico',
    };

    const notification = new window.Notification(options.title, options);

      notification.onclick = () => {
        console.log('click');
      }
  });
});
```

## 全局快捷键注册

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主界面</title>
</head>

<body>

  <h2>注册快捷键</h2>

  <script src="index.js"></script>

</body>

</html>
```

main.js

```js
const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWinId = null

function createWindow () {
  let mainWin = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWin.loadFile('index.html');

  mainWinId = mainWin.id

  mainWin.on('ready-to-show', () => {
    mainWin.show();
  });

  mainWin.on('close', () => {
    mainWin = null;
  });
}

app.whenReady().then(createWindow);

app.on('ready', () => {
  const ret = globalShortcut.register('ctrl + a', () => {
    console.log('click')
  });

  if (!ret) {
    console.log('girst shortcut failed.');
  }

  console.log(globalShortcut.isRegistered('ctrl + a'));
});

app.on('will-quit', () => {
  // globalShortcut.unregister('ctrl + a');
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  app.quit();
});
```

## 剪切板模块

