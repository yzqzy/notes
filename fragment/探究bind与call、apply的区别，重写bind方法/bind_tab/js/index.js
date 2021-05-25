;(function () {
  var Tab = function () {
    this.tab = document.getElementsByClassName('tab')[0];
    this.tabs = document.getElementsByClassName('t-item');
    this.pages = document.getElementsByClassName('p-item');
  }

  Tab.prototype = {
    init: function () {
      this.bindEvent();
    },

    bindEvent: function () {
      this.tab.addEventListener('click', this.tabClick.bind(this), false);
    },

    tabClick: function (e) {
      var e = e || window.event,
          tar = e.target || e.srcElement,
          className = tar.className,
          oTabs = this.tabs,
          oPages = this.pages,
          len = oTabs.length,
          thisIdx = [].indexOf.call(oTabs, tar);

      if (className === 't-item') {
        for (var i = 0; i < len; i++) {
          oTabs[i].className = 't-item';
          oPages[i].className = 'p-item';
        }
        
        oTabs[thisIdx].className += ' active';
        oPages[thisIdx].className += ' active';
      }
    }
  }

  window.Tab = Tab;
})();