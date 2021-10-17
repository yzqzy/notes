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
