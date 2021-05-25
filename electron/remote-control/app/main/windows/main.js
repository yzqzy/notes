const { BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let win;

function create () {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    width: 600,
    height: 300,
    // windows 隐藏导航栏
    // frame: false,
    // mac 隐藏导航栏
    // titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  
  if (isDev) {
    // 调试模式
    // win.webContents.openDevTools();
    // 加载本地环境
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.resolve(__dirname, '../../renderer/views/main/index.html'));
  }
}

function send (channel, ...args) {
  win.webContents.send(channel, ...args);
}

module.exports = {
  create,
  send
};