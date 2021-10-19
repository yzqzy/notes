const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oInput = document.getElementById('J-input');

  // 发送数据
  const oBtn = document.getElementById('J-btn');
  oBtn.addEventListener('click', () => {
    ipcRenderer.send('stm', 'from sub process message');
  });

  // 接收数据
  ipcRenderer.on('its', (ev, data) => {
    oInput.value = data;
  });
});