const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    ipcRenderer.send('openWin1', 'form index render process message');
  });

  // 接口消息
  ipcRenderer.on('mti', (ev, data) => {
    console.log(data);
  });
});
