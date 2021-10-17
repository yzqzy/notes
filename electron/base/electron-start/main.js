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
