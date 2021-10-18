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
      label: '角色',
      submenu: [
        {
          label: '复制',
          role: 'copy'
        },
        {
          label: '剪切',
          role: 'cut'
        },
        {
          label: '粘贴',
          role: 'paste'
        },
        {
          label: '最小化',
          role: 'minimize'
        }
      ]
    },
    {
      label: '类型',
      submenu: [
        {
          label: '选项1',
          type: 'checkbox'
        },
        {
          label: '选项2',
          type: 'checkbox'
        },
        {
          label: '选项3',
          type: 'checkbox'
        },
        {
          type: 'separator'
        },
        {
          label: 'item1',
          type: 'radio'
        },
        {
          label: 'item2',
          type: 'radio'
        },
        {
          type: 'separator'
        },
        {
          label: 'windows',
          type: 'submenu',
          role: 'windowMenu'
        }
      ]
    },
    {
      label: '自定义快捷键',
      submenu: [
        {
          label: '打开',
          accelerator: 'ctrl + o',
          click () {
            console.log('process open');
          }
        }
      ]
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
