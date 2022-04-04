const { effect } = require('./effect');

function computed (getter) {
  // 缓存上一次的值
  let value;
  // 标识是否需要重新计算值，true 意味要重新计算
  let dirty = true;

  const effectFn = effect(
    getter,
    {
      lazy: true,
      // 添加调度器，调度器中重置 dirty
      scheduler () {
        dirty = true;
        // 计算属性依赖的响应式数据发生变化时，手动调用 trigger 函数触发响应
        trigger(obj, 'value');
      }
    }
  );

  const obj = {
    get value () {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      // 读取 value 时，手动调用 track 函数进行追踪
      track(obj, 'value');
      return value;
    }
  }

  return obj;
}

module.exports = {
  computed
}