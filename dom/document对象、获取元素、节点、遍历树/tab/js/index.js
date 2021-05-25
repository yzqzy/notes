// var tabItem = document.getElementsByClassName('tab-item'),
//     pageItem = document.getElementsByClassName('page-item');

// for (var i = 0; i < tabItem.length; i++) {
//   ;(function (j) {
//     tabItem[j].onclick = function () {
//       for (var k = 0; k < tabItem.length; k++) {
//         tabItem[k].className = 'tab-item';
//         pageItem[k].className = 'page-item';
//       }
//       this.className += ' cur';
//       pageItem[j].className += ' active';
//     }
//   })(i);
// }

;(function () {
  var Tab = function (opt) {
    this.tabs = document.getElementsByClassName(opt.tabItem);
    this.pages = document.getElementsByClassName(opt.pageItem);

    this.bindEvent(opt.tabItem, opt.pageItem, opt.cur, opt.active);
  }

  Tab.prototype = {
    bindEvent: function (tabItem, pageItem, cur, active) {
      var tabs = this.tabs,
          pages = this.pages;

      for (var i = 0; i < tabs.length; i++) {
        ;(function (j) {
          tabs[j].onclick = function () {
            for (var k = 0; k < tabs.length; k++) {
              tabs[k].className = tabItem;
              pages[k].className = pageItem;
            }
            this.className = tabItem +  ' ' + cur;
            pages[j].className = pageItem + ' ' + active;
          }
        })(i);
      }
    }
  }

  window.Tab = Tab;
})();