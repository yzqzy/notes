function init_modules () {
  initCompute();
}

var initCompute = (function () {
  var oDiv = document.getElementsByTagName('div')[0];

  function init () {
    bindEvent();
  }

  function bindEvent () {
    oDiv.addEventListener('click', btnClick, false);
  }

  function btnClick (ev) {
    var e = ev || window.event,
        tar = e.target || e.srcElement,
        tagName = tar.tagName.toLowerCase(),
        first = document.getElementById('first').value,
        second = document.getElementById('second').value;

    if (first > 0 && second > 0) {
      var firstVal = Number(first),
          secondVal = Number(second);
    } else {
      alert('必须填入数字');
      return;
    }

    if (tagName === 'button') {
      var field = tar.getAttribute('data-field');

      switch (field) {
        case 'plus':
          console.log(utils.plus(firstVal, secondVal));
          break;
        case 'minus':
          console.log(utils.minus(firstVal, secondVal));
          break;
        case 'mul':
          console.log(utils.mul(firstVal, secondVal)); 
          break;
        case 'div':
          console.log(utils.div(firstVal, secondVal));
          break;
        default: 
        console.log('error');
          break;
      }
    }
  }

  return function () {
    init();
  }
})();