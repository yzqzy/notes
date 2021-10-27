const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

Store.initRenderer();

let mainWindow = null;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  const urlLocation = isDev ? 'http://localhost:3000' : ''

  mainWindow.loadURL(urlLocation);
});