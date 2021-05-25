Element.prototype.dragNclick = (function (menu, elemClick) {

  var bTime = 0,
      eTime = 0,
      oPos = [],
      cbTime = 0,
      ceTime = 0,
      counter = 0,
      t = null,
      wWidth = getViewportSize().width,
      wHeight = getViewportSize().height,
      elemWidth = parseInt(getStyles(this, 'width')),
      elemHeight = parseInt(getStyles(this, 'height')),
      mWidth = parseInt(getStyles(menu, 'width')),
      mHeight = parseInt(getStyles(menu, 'height'));

  drag.call(this);

  function drag () {
    var x,
        y,
        _self = this;
  
    addEvent(this, 'mousedown', function (ev) {
      var e = e || window.event,
          btnCode = e.button;

      if (btnCode === 2) {
        var mLeft = pagePos(e).X,
            mTop = pagePos(e).Y;

        if (mLeft <= 0) {
          mLeft = 0;
        } else if (mLeft >= wWidth - mWidth) {
          mLeft = pagePos(e).X - mWidth;
        }

        if (mTop <= 0) {
          mTop = 0;
        } else if (mTop >= wHeight - mHeight) {
          mTop = pagePos(e).Y - mHeight;
        }

        menu.style.left = mLeft + 'px';
        menu.style.top = mTop + 'px';
        menu.style.display = 'block';
      } else if (btnCode === 0) {
        bTime = new Date().getTime();
        oPos = [parseInt(getStyles(_self, 'left')), parseInt(getStyles(_self, 'top'))];
        menu.style.display = 'none';

        x = pagePos(e).X - oPos[0];
        y = pagePos(e).Y - oPos[1];
    
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBubble(e);
        preventDefaultEvent(e);
      }
    });

    addEvent(document, 'contextmenu', function (ev) {
      var e = ev || window.event;
      preventDefaultEvent(e);
    });
  
    addEvent(document, 'click', function () {
      menu.style.display = 'none';
    });

    addEvent(menu, 'click', function (ev) {
      var e = ev || window.event;
      cancelBubble(e);
    });


    function mouseMove (ev) {
        var e = ev || window.event;
            elemLeft = pagePos(e).X - x,
            elemTop = pagePos(e).Y - y;
          
        if (elemLeft <= 0) {
          elemLeft = 0;
        } else if (elemLeft >= wWidth - elemWidth) {
          elemLeft = wWidth - elemWidth - 1;
        }

        if (elemTop <= 0) {
          elemTop = 0;
        } else if (elemTop >= wHeight - elemHeight) {
          elemTop = wHeight - elemHeight - 1;
        }

        _self.style.left = elemLeft + 'px';
        _self.style.top = elemTop + 'px';
      }
  
      function mouseUp () {
        eTime = new Date().getTime();



        if (eTime - bTime < 150) {
          _self.style.left = oPos[0] + 'px';
          _self.style.top = oPos[1] + 'px';

          counter++;

          if (counter === 1) {
            cbTime = new Date().getTime();
          }

          if (counter === 2) {
            ceTime = new Date().getTime();
          }

          if (cbTime && ceTime && (ceTime - cbTime < 200)) {
            elemClick();
          }

          t = setTimeout(() => {
            cbTime = 0;
            ceTime = 0;
            counter = 0;
            clearTimeout(t);
          }, 500);
        }

        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
      }
  }
});

var oLink = document.getElementsByTagName('a')[0],
    oMenu = document.getElementsByTagName('div')[0];

oLink.dragNclick(oMenu, function () {
  window.open('http://www.baidu.com');
});

