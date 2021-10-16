const { app } = require('electron');
const handleIpc = require('./ipc');
const { create: createMainWindow } = require('./windows/main');

app.on('ready', () => {
  // 创建主窗口
  createMainWindow();
  // 处理 IPC 通信
  handleIpc();
  // 指令控制
  require('./robot')();
});