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
