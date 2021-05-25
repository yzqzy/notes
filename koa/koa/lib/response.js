module.exports = {
  __body__: undefined,

  get body () {
    return this.__body__;
  },

  set body (newValue) {
    this.__body__ = newValue;
  }
}