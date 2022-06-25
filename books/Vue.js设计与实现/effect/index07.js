let activeEffect;

const effectStack = [];

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    // 将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 执行函数
    fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}

function cleanup (effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i];
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn);
  }
  // 重置 effectFn.deps 数组
  effectFn.deps.length = 0;
}

const bucket = new WeakMap();

function track (target, key) {
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

  // 将依赖添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps);
}

function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 const effectsToRun = new Set();
  
 effects && effects.forEach(effectFn => {
   // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
   if (effectFn !== activeEffect) {
     effectsToRun.add(effectFn);
   }
 })
 
 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 effectsToRun.forEach(effectFn => effectFn());
}

const data = { foo: 1 };
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
  obj.foo++;
});