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
