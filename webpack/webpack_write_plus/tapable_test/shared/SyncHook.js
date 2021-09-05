const Hook = require('./Hook.js');

class HookCodeFactory {
  // 准备后续需要使用的数据
  setup (instance, options) {
    this.options = options; // 源码中是通过 init 方法实现
    instance._x = options.taps.map(o => o.fn);
  }

  args () {
    return this.options.args.join(',');
  }

  head () {
    return `var _x = this._x;`;
  }

  content () {
    let code = '';

    for (var i = 0; i < this.options.taps.length; i++) {
      code += `var _fn${i} = _x[${i}]; _fn${i}(${this.args()});`;
    }

    return code;
  }

  // 创建一段可执行的代码体并返回
  create (options) {
    let fn = undefined;

    fn = new Function(
      this.args(),
      this.head() + this.content()
    )

    return fn;
  }
}

const factory = new HookCodeFactory();

class SyncHook extends Hook {
  constructor (args) {
    super(args);
  }

  compile (options) { // { taps: [], args: [name, age] }
    factory.setup(this, options);
    return factory.create(options);
  }
}

module.exports = SyncHook;