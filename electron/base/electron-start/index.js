const electron = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    // 点击按钮打开新窗口

    let newWin = new remote.BrowserWindow({
      width: 200,
      height: 200
    });

    newWin.loadFile('newindex.html'),

    newWin.on('close', () => {
      newWin = null
    });
  })
});