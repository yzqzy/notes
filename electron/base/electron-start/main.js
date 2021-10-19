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