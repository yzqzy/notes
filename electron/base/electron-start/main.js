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
