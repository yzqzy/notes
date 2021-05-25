window.onload = function () {
  init();
}

function init () {
  Accordion();
}

var Accordion = (function () {
  var oList = document.getElementsByClassName('list')[0],
      oItem = document.getElementsByClassName('list-item'),
      len = oItem.length,
      curIdx = 0;

  addEvent(oList, 'mouseover', function (ev) {
    addEvent(this, 'mousemove', slide); // 性能较好
    // var e = ev || window.event,
    //     tar = e.target || e.srcElement,
    //     className = tar.className.toLowerCase();

    //   if (className.indexOf('list-item') != -1) {
    //     var thisIdx = [].indexOf.call(oItem, tar);

    //     if (curIdx !== thisIdx) {
    //       curIdx = thisIdx;

    //       for (var i = 0; i < len; i++) {
    //         oItem[i].className = 'list-item';
    //       }
  
    //       oItem[curIdx].className += ' active';
    //     }
    //   }
  });

  addEvent(oList, 'mouseout', function () {
    removeEvent(this, 'mousemove', slide);
  })

  function slide (ev) {
    var e = ev || window.event,
        tar = e.target || e.srcElement,
        oParnet = findParent(tar),
        thisIdx = [].indexOf.call(oItem, oParnet),
        item;

    if (curIdx !== thisIdx) {
      curIdx = thisIdx;

      for (var i = 0; i < len; i++) {
        item = oItem[i];
        item.className = 'list-item';
      }

      oItem[curIdx].className += ' active';
    }
  } 

  function findParent (target) {
    while (target.tagName.toLowerCase() !== 'li') {
      target = target.parentNode;
    }

    return target;
  }
});