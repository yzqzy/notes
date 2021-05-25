var dropdown = document.getElementsByClassName('dropdown')[0],
    oList = elemChildren(dropdown)[1],
    timer = null,
    listHeight = 0,
    speed = 2;

// 鼠标移入事件
dropdown.onmouseenter = function () {
  clearInterval(timer);
  timer = setInterval(function () {
    if (listHeight >= 200) {
      clearInterval(timer);
    } else {
      listHeight = parseInt(getStyles(oList, 'height')) + speed;
      oList.style.height = listHeight + 'px';
    }
  }, 1)
  this.className += ' up';
}

// 鼠标移出事件
dropdown.onmouseleave = function () {
  clearInterval(timer);
  timer = setInterval(function () {
    if (listHeight <= 0) {
      clearInterval(timer);
    } else {
      listHeight = parseInt(getStyles(oList, 'height')) - speed;
      oList.style.height = listHeight + 'px';
    }
  }, 1)
  this.className = 'dropdown';
}