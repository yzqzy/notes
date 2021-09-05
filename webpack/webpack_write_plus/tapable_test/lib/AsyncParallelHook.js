const Hook = require('./Hook.js');

class HookCodeFactory {
  setup (instance, options) {
    this.options = options;
    instance._x = options.taps.map(o => o.fn);
  }

  args ({ after, before } = {}) {
    let allArgs = this.options.args;

    if (before) allArgs = [before].concat(allArgs);
    if (after) allArgs = allArgs.concat(after);

    return allArgs.join(',');
  }

  head () {
    return `"use strict"; var _context; var _x = this._x;`;
  }

  content () {
    let code = '';

    code += `
      var _counter = ${ this.options.taps.length };
      var _done = (function () {
        _callback();
      });
    `

    for (var i = 0; i < this.options.taps.length; i++) {
      code += `
        var _fn${i} = _x[${i}];
        
        _fn${i}(name, age, (function () {
          if (--_counter === 0) _done();
        }))
      `;
    }

    return code;
  }

  // 创建一段可执行的代码体并返回
  create (options) {
    let fn = undefined;

    fn = new Function(
      this.args({
        after: '_callback'
      }),
      this.head() + this.content()
    )

    return fn;
  }
}

const factory = new HookCodeFactory();

class AsyncParallelHook extends Hook {
  constructor (args) {
    super(args);
  }

  compile (options) {
    factory.setup(this, options);
    return factory.create(options);
  }
}

module.exports = AsyncParallelHook;