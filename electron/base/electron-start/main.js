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
