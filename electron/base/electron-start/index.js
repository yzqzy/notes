const { remote } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');
  const oErrorBtn = document.getElementById('J-err-btn');

  oBtn.addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      defaultPath: __dirname,
      title: '选择文件',
      buttonLabel: '请选择',
      properties: ['openFile', 'multiSelections'],
      filters: [
        {
          name: '代码文件',
          extensions: ['js', 'json', 'html']
        },
        {
          name: '图片文件',
          extensions: ['ico', 'jpg', 'png']
        },
        {
          name: '媒体文件',
          extensions: ['avi', 'mp4', 'mp3']
        }
      ]
    })
      .then(ret => {
        console.log(ret);
      })
      .catch(err => console.log(err));
  });

  oErrorBtn.addEventListener('click', () => {
    remote.dialog.showErrorBox('自定义标题', '自定义内容');
  });
});
