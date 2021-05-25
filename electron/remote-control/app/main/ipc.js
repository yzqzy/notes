const { ipcMain } = require('electron');
const { send: sendMainWindow } = require('./windows/main');
const { create: createControlWindow, send: sendControlWindow } = require('./windows/control');
const signal = require('./signal');

module.exports = () => {
  ipcMain.handle('login', async () => {
    const { code } = await signal.invoke('login', null, 'logined');
    return code;
  });
 
  // 发送控制信息
  ipcMain.on('control', async (e, remote) => {
    signal.send('control', { remote });
  });

  // 控制
  signal.on('controlled', (data) => {
    createControlWindow();
    sendMainWindow('control-state-change', data.remote, 1);
  });

  // 被控制
  signal.on('be-controlled', (data) => {
    sendMainWindow('control-state-change', data.remote, 2);
  });

  // 转发
  ipcMain.on('forward', (e, event, data) => {
    signal.send('forward', { event, data });
  });

  // 响应 offer 
  signal.on('offer', (data) => {
    sendMainWindow('offer', data);
  });
  // 响应 answer
  signal.on('answer', (data) => {
    sendControlWindow('answer', data);
  });
  // 响应 candidate
  signal.on('puppet-candidate', (data) => {
    sendControlWindow('candidate', data);
  });
  signal.on('control-candidate', (data) => {
    sendMainWindow('candidate', data);
  });
}