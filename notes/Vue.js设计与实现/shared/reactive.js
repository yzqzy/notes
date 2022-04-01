const {
  track, trigger,
  ITERATE_KEY, TRIGGER_TYPE,
  arrayInstrumentations
} = require('./effect');

const { isPlainObject, isPlainMap, isPlainSet } = require('./util');

const mutableInstrumentations = {
  add (key) {
    // this 仍然指向的是代理对象，通过 raw 属性获取原始数据对象
    const target = this.raw;
    // 先判断值是否已经存在
    const hadKey = target.has(key);
    // 只有再值不存在情况下，才需要触发响应
    if (!hadKey) {
      // 通过原始对象对象执行 add 方法删除具体的值
      // 这里不再徐亚 .bind 了，因为是直接通过 target 调用并执行的
      const res = target.add(key);
      // 调用 trigger 函数触发响应，并指定操作类型为 ADD
      trigger(target, key, TRIGGER_TYPE.ADD);
      // 返回操作结果
      return res;
    }
    return target;
  },
  delete (key) {
    const target = this.raw;
    const hadKey = target.has(key);
    const res = target.delete(key);
    if (hadKey) {
      trigger(target, key, TRIGGER_TYPE.DELETE);
    }
    return res;
  },
  get (key) {
    // 获取原始对象
    const target = this.raw;
    // 判断读取的 key 是否存在
    const hadKey = target.has(key);
    // 追踪依赖，建立响应联系
    track(target, key);
    // 如果存在，则返回结果。如果得到的结果 res 仍然是可代理的数据，则要返回使用 reactive 包装后的响应式数据
    if (hadKey) {
      const res = target.get(key);
      return isPlainObject(res) ? reactive(res) : res;
    }
  },
  set (key, value) {
    const target = this.raw;
    const hadKey = target.has(key);

    // 获取旧值
    const oldVal = target.get(key);
    // 获取原始数据据，由于 value 本身可能已经是原始数据，所以此时 value.raw 不存在，则直接使用 value
    const rawValue = value.raw || value;
    // 设置新值
    target.set(key, rawValue);

    // 如果不存在，则说明是 ADD 类型的操作
    if (!hadKey) {
      trigger(target, key, TRIGGER_TYPE.ADD);
    } else if (oldVal !== value && (oldVal === oldVal || value === value)) {
      // 如果存在，并且值变化，则是 SET 操作
      trigger(target, key, TRIGGER_TYPE.SET);
    }
  },
  forEach (callback, thisArg) {
    // wrap 函数用来把可代理的值转换为响应式数据
    const wrap = (val) => typeof val === 'object' ? reactive(val) : val;
    // 取得原始数据对象
    const target = this.raw;
    // 与 ITERATE_KEY 建立响应关系
    track(target, ITERATE_KEY);
    // 通过原始数据对象调用 forEach 方法，并把 callback 传递过去
    target.forEach((v, k) => {
      // 手动调用 callback，用 wrap 函数包裹 vlaue 和 key 再传给 callback，这样就实现了深响应
      callback.call(thisArg, wrap(v), wrap(k), this);
    });
  },
  [Symbol.iterator]: iterationMethod,
  entries: iterationMethod
};

// 抽离为独立的函数，便于复用
function iterationMethod () {
  // 获取原始数据对象 target
  const target = this.raw;
    // 获取原始迭代器方法
  const itr = target[Symbol.iterator]();

  const wrap = (val) => isPlainObject(val) ? reactive(val) : val;

  // 调用 track 函数建立响应联系
  track(target, ITERATE_KEY);

  // 返回自定义迭代器
  return {
    next () {
      // 调用原始迭代器的 next 方法获取 value 和 done
      const { value, done } = itr.next();

      return {
        // 如果 value 不是 undefined，对其进行包裹
        value: value ? [wrap(value[0]), wrap(value[1])] : value,
        done
      }
    },
    [Symbol.iterator] () {
      return this;
    }
  };
}

function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      // Set,Map 特殊处理
      if (isPlainMap(obj) || isPlainSet(obj)) {
        if (key === 'size') {
          // 调用 track 函数建立响应关系
          track(target, ITERATE_KEY);
          return Reflect.get(target, key, target);
        }
        // return target[key].bind(target);
        // 返回定义在 mutableInstrumentations 对象下的方法
        return mutableInstrumentations[key];
      }

      // 如果操作的目标对象是数组，并且 key 存在于 arrayInstrumentations 上
      // 那么返回定义在 arrayInstrumentations 上的值
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }

      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key);
      }
      
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return isReadonly ? readonly(res) : reactive(res);
      }

      return res;
    },
    set (target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const oldVal = target[key];

      const type = Array.isArray(target) 
        // 如果代理目标是数组，则检测被设置的索引值是否小于数组长度，如果是，视为 SET 操作，否则是 ADD 操作
        ? Number(key) < target.length ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD
        : Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;

      const res = Reflect.set(target, key, newVal, receiver);

      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 增加第四个参数，即触发响应的新值
          trigger(target, key, type, newVal);
        }
      }
  
      return res;
    },
    ownKeys (target) {
      // 如果操作目标 target 是数组，使用 length 属性作为 key 建立响应联系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    deleteProperty (target, key) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const res = Reflect.deleteProperty(target, key);
  
      if (res && hadKey) {
        trigger(target, key, TRIGGER_TYPE.DELETE);
      }
      return res;
    }
  });
}

// 定义一个 Map 实例，存储原始对象到代理对象的映射
const reactiveMap = new Map();

function reactive (obj) {
  // 优先通过原始对象 obj 寻找之前创建的代理对象，如果找到了，直接返回已有的代理对象
  const existionProxy = reactiveMap.get(obj);

  if (existionProxy) return existionProxy;

  const proxy = crateReactive(obj);

  reactiveMap.set(obj, proxy);

  return proxy;
}

function shallowReactive (obj) {
  return crateReactive(obj, true);
}

function readonly (obj) {
  return crateReactive(obj, false, true);
}

function shallowReadonly (obj) {
  return crateReactive(obj, true, true);
}

module.exports = {
  reactive,
  shallowReactive,
  readonly
}