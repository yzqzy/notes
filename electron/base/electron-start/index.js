const { clipboard, nativeImage } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const oBtns = document.getElementsByTagName('button');
  const oInputs = document.getElementsByTagName('input');

  const oClipBtn = document.getElementById('clipImg');

  let ret = null;

  oBtns[0].onclick = function () {
    // 复制内容
    ret = clipboard.writeText(oInputs[0].value);
  }

  oBtns[1].onclick = function () {
    // 粘贴内容
    oInputs[1].value = clipboard.readText(ret);
  }

  oClipBtn.onclick = function () {
    // 复制图片到剪切板中时，图片类型必须是 nativeImage 实例
    const oImage = nativeImage.createFromPath('./favicon.ico');

    clipboard.writeImage(oImage);

    // 将剪切板中的图片作为 DOM 元素显示在页面中
    const oImg = clipboard.readImage();

    const oImageDom = new Image();

    oImageDom.src = oImg.toDataURL();

    document.body.appendChild(oImageDom);
  }
});
