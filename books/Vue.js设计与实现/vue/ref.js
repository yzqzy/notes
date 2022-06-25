const { reactive } = require('./reactive');

function ref (val) {
  // 在 ref 函数内部创建包裹对象
  const wrapper = {
    value: val
  };
  // 使用 Object.defineProperty 在 wrapper 对象上定义一个不可枚举属性
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true    
  });
  // 将包裹对象变成响应式数据
  return reactive(wrapper);
}

function toRef (obj, key) {
  const wrapper = {
    get value () {
      return obj[key];
    },
    set value (val) {
      obj[key] = val;
    }
  }

  Object.defineProperty(wrapper, '__v_isRef', {
    value: true    
  });

  return wrapper;
}

function toRefs (obj) {
  const ans = {};
  for (const key in obj) {
    ans[key] = toRef(obj, key);
  }
  return ans;
}

function proxyRefs (target) {
  return new Proxy(target, {
    get (target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      return value.__v_isRef ? value.value : value;
    },
    set (target, key, newValue, receiver) {
      const value = target[key];
      if (value.__v_isRef) {
        value.value = newValue;
        return true;
      }
      return Reflect.set(target, key, newValue, receiver);
    }
  })
}

module.exports = {
  ref,
  toRef,
  toRefs,
  proxyRefs
};
