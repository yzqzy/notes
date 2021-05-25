import { TriggerOpTypes } from "./opeartion";

export function effect (fn, options = {}) {
  const effect = createReactiveEffect(fn, options);

  if (!options.lazy) {
    effect();
  }

  return effect;
}

let uid = 0;
let activeEffect,
    effectStack = [];

function createReactiveEffect (fn, options) {
  const effect = function reactiveEffect () {
    if (effectStack.includes(effect)) {
      return;
    }

    try {
      effectStack.push(effect);
      activeEffect = effect;
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  }

  effect.options = options;
  effect.id = uid++;
  effect.deps = [];

  return effect;
}


const targetMap = new WeakMap();


export function track (target, type, key) {
  if (activeEffect === undefined) {
    return;
  } 

  let depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);

  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}

export function trigger (target, type, key, value, oldValue) {
  const depsMap = targetMap.get(target);

  if (!depsMap) {
    return;
  }

  const effects = new Set(),
        computedRunners = new Set();

  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        if (effect.options.computed) {
          computedRunners.add(effect);
        } else {
          effects.add(effect);
        }
      })
    }
  }
  
  if (key != null) {
    add(depsMap.get(key));
  }
  
  if (type === TriggerOpTypes.ADD) {
    add(depsMap.get(Array.isArray(target) ? 'length' : ''));
  }
  
  const run = (effect) => {
    if (effect.options.schedular) {
      effect.options.schedular();
    } else {
      effect();
    }
  }

  computedRunners.forEach(run);
  effects.forEach(run);
}