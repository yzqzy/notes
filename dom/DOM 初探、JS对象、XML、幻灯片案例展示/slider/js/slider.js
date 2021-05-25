// var thumbsItem = document.getElementsByClassName('thumb-item'),
//     sliderItem = document.getElementsByClassName('slider-item');

// for (var i = 0; i < thumbsItem.length; i++) {
//   ;(function (j) {
//     thumbsItem[j].onclick = function () {
//       for (var k = 0; k < thumbsItem.length; k++) {
//         thumbsItem[k].className = 'thumb-item';
//         sliderItem[k].className  = 'slider-item';   
//       }
  
//       this.className += ' cur';
//       sliderItem[j].className += ' active';
//     }
//   })(i);
// }

// 插件化
;(function () {
  var Slider = function (opt) {
    this.sliderItem = document.getElementsByClassName(opt.sliderItem);
    this.thumbItem = document.getElementsByClassName(opt.thumbItem);

    this.init();
  }

  Slider.prototype = {
    bindEvent: function () {
      var slider = this.sliderItem,
          thumbs = this.thumbItem;

      for (i = 0; i < thumbs.length; i++) {
        ;(function (j) {
          thumbs[j].onclick = function () {
            for (var k = 0; k < thumbs.length; k++) {
              thumbs[k].className = 'thumb-item';
              slider[k].className = 'slider-item';
            }

            this.className += ' cur';
            slider[j].className += ' active';
          }
        })(i);
      }
    },
    init: function () {
      this.bindEvent();
    }
  }

  window.Slider = Slider;
})();
