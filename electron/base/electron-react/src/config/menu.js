const { shell } = require('electron')

const template = [
  {
    label: '文件',
    submenu: [
      {
        label: '新建',
        accelerator: 'CmdOrCtrl+N',
        click(menuItem, browserWindow, event) {
          browserWindow.webContents.send('execute-create-file')
        }
      },
      {
        label: '保存',
        accelerator: 'CmdOrCtrl+S',
        click(menuItem, browserWindow, event) {
          browserWindow.webContents.send('execute-save-file')
        }
      },
      {
        label: '搜索',
        accelerator: 'CmdOrCtrl + F',
        click(menuItem, browserWindow, event) {
          browserWindow.webContents.send('execute-search-file')
        }
      },
      {
        label: '导入',
        accelerator: 'CmdOrCtrl + o',
        click(menuItem, browserWindow, event) {
          browserWindow.webContents.send('execute-import-file')
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl + Z',
        role: 'undo'
      },
      {
        label: '重做',
        accelerator: 'Shift + CmdOrCtrl + z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: '复制',
        accelerator: 'CmdOrCtrl + c',
        role: 'copy'
      },
      {
        label: '全选',
        accelerator: 'CmdOrCtrl + A',
        role: 'selectall'
      }
    ]
  },
  {
    label: '视图',
    submenu: [
      {
        label: '刷新',
        accelerator: 'Shift + CmdOrCtrl + R',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload()
          }
        }
      },
      {
        label: '最大化',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Ctrl + Command + F'
          } else {
            return 'F11'
          }
        })(),
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      },
      {
        label: '开发者工具',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Alt + Command + I'
          } else {
            return 'Ctrl + Shift + I'
          }
        })(),
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        }
      }
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl + M',
        role: 'minimize'
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl + W',
        role: 'close'
      }
    ]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '更多',
        click() {
          shell.openExternal("http://electronjs.org")
        }
      }
    ]
  }
]

module.exports = template
