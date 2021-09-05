class Hook {
  constructor (args = []) {
    this.args = args;
    this.taps = []; // 用于存放组装好的对象信息
    this._x = undefined; // 用于在代码工厂函数中使用
  }

  tap (options, fn) {
    if (typeof options === 'string') {
      options = { name: options }
    }
    options = Object.assign({ fn }, options); // { fn, name: fn1 }

    // 将组装好的 options 添加至数组中
    this._insert(options);
  }

  _insert (options) {
    this.taps[this.taps.length] = options;
  }

  call (...args) {
    // 创建具体要执行的函数代码结构
    let callFn = this._createCall();

    // 调用上述函数，传参
    return callFn.apply(this, args);    
  }

  _createCall () {
    return this.compile({
      taps: this.taps,
      args: this.args
    });
  }
}

module.exports = Hook;