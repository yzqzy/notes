const { app, BrowserWindow, Menu } = require('electron');

console.log(process.platform)

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

  // 自定义菜单项
  const menuItems = [
    {
      label: '文件',
      submenu: [
        {
          label: '打开文件',
          click () {
            console.log('open file.');
          }
        },
        {
          type: 'separator'
        },
        {
          label: '关闭文件夹'
        },
        {
          label: '关于',
          role: 'about'
        }
      ]
    },
    {
      label: '编辑'
    }
  ];
  // 创建菜单
  const menu = Menu.buildFromTemplate(menuItems);
  // 将菜单添加至窗体中
  Menu.setApplicationMenu(menu);

  mainWin.loadFile('index.html');

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
