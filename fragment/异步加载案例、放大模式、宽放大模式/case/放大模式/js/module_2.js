var mod = (function (module) {
  module.b = 2;

  module.test2 = function () {
    console.log('test2');
  }

  return module;
})(mod);