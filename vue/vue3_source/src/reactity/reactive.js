import { isObject } from "../shared/utils";
import { mutableHandler } from "./baseHandler";


export function reactive (target) {
  // 创建响应式对象
  return createReactiveObject(target, mutableHandler); 
}

function createReactiveObject (target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }
  const observed = new Proxy(target, baseHandler);
  return observed;
}