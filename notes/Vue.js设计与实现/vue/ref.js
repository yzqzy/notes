const { reactive } = require('./reactive');

function ref (val) {
  // 在 ref 函数内部创建包裹对象
  const wrapper = {
    value: val
  };
  // 使用 Object.defineProperty 在 wrapper 对象上定义一个不可枚举属性
  Object.defineProperty(wrapper, '_v_isRef', {
    value: true    
  });
  // 将包裹对象变成响应式数据
  return reactive(wrapper);
}

module.exports = {
  ref
};
