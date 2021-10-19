const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    ipcRenderer.send('openWin1');
    
    localStorage.setItem('name', 'yueluo');
  });
});
