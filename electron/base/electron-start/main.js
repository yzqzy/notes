const { app, BrowserWindow } = require('electron');

function createWindow () {
  let mainWin = new BrowserWindow({
    x: 0,
    y: 0,
    show: false,
    width: 800,
    height: 400,
    maxWidth: 1000,
    maxHeight: 600,
    minWidth: 600,
    minHeight: 200,
    resizable: false,
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
