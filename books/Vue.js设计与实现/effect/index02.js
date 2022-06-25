let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}

const bucket = new Set();

const data = { text: 'hello world' };

const obj = new Proxy(data, {
  get (target, key) {
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true;
  }
});


// effect(() => {
//   document.body.innerText = obj.text;
// });

// setTimeout(() => {
//   obj.text = 'hello vue3';
// }, 1000);


effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = 'hello vue3';
}, 1000);
