const { app, BrowserWindow, Notification, ipcMain } = require('electron');

let win;

app.on('ready', () => {
  // 赋值给全局变量，避免被垃圾回收
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('../index.html');
  
  handleIPC();
});

function handleIPC () {
  ipcMain.handle('work-notification', async () => {
    const res = await new Promise((resolve, reject) => {
      const notification = new Notification({
        title: '任务结束',
        body: '是否开始休息',
        actions: [
          {
            text: '开始休息',
            type: 'button'
          }
        ],
        closeButtonText: '继续工作'
      });

      notification.show();

      notification.on('action', () => {
        resolve('rest');
      });
      notification.on('close', () => {
        resolve('work');
      });
    });

    return res;
  });
}

