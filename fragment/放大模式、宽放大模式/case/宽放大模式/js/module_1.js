var mod = (function (module) {
  module.a = 1;

  module.test1 = function () {
    console.log('test1');
  }

  return module;
})(mod || {});