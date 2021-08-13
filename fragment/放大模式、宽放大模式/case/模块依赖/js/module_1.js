var mod1 = (function () {
  var test1 = function () {
    console.log('test1');
  },

  test2 = function () {
    console.log('test2');
  },

  test3 = function () {
    console.log('test3');
  }

  return {
    test1: test1,
    test2: test2,
    test3: test3
  }
})();

var mod2 = (function (mod) {
  var test4 = function () {
    mod.test1();
  },

  test5 = function () {
    mod.test2();
  },

  test6 = function () {
    mod.test3();
  }

  return {
    test4: test4,
    test5: test5,
    test6: test6
  }
})(mod1);