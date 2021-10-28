const { app, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const menuTemplate = require('./src/config/menu');

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

  // 添加自定义原生菜单
  const menu = Menu.buildFromTemplate(menuTemplate);
  
  Menu.setApplicationMenu(menu);
});