let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}

const data = { text: 'hello world' };

const bucket = new WeakMap();

const obj = new Proxy(data, {
  get (target, key) {
    if (!activeEffect) return;

    // 使用 target 在 bucket 中获取 depsMap，key -> effects
    let depsMap = bucket.get(target);

    // 如果不存在 depsMap，新建 map 与 target 关联
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()));
    }

    // 使用 key 在 depsMap 中获取 deps，deps 是一个 set 类型
    let deps = depsMap.get(key);

    // 如果 deps 不存在，新建 set 与 key 关联
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }

    // 将激活的副作用函数添加到 deps 中
    deps.add(activeEffect);

    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;

    // 使用 target 从 bucket 中获取 depsMap，key -> effects
    const depsMap = bucket.get(target);

    if (!depsMap) return;

    // 根据 key 从 depsMap 中获取 effects
    const effects = depsMap.get(key);

    effects && effects.forEach(fn => fn());
  }
});


effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = 'hello vue3';
}, 1000);
