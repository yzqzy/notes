const { effect, track, trigger } = require('../shared/effect');

const data = {
  foo: 1,
  get bar () {
    return this.foo
  }
};

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.bar);
});

data.foo++;