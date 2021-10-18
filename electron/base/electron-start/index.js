const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtns = document.getElementsByTagName('button');

  // 1. 异步 API 向主进程发送消息
  oBtns[0].addEventListener('click', () => {
    ipcRenderer.send('msg1', 'from render process async message');
  });
  // 接收主进程异步消息
  ipcRenderer.on('res1', (ev, data) => {
    console.log(data);
  });


  // 2. 同步 API 向主进程发送消息
  oBtns[1].addEventListener('click', () => {
    const ret = ipcRenderer.sendSync('msg2', 'from render process message');

    console.log(ret);
  });


  // 3. 接收主进程主动推送的消息
  ipcRenderer.on('mtp', (ev, data) => {
    console.log(data);
  });
});