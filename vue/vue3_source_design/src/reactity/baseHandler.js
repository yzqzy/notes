import { isObject, hasOwn, hasChanged } from "../shared/utils";
import { reactive } from "./reactive";
import { trigger, track } from "./effect";
import { TrackOpTypes, TriggerOpTypes} from './opeartion';

/**
 * @file 对象和数组相关的处理函数
 */
const get = createGetter(),
      set = cretaeSetter();


function createGetter () {
  return function get (target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    // 依赖收集
    track(target, TrackOpTypes.GET, key);
    // 如果是数组或对象
    if (isObject(res)) {
      return reactive(res);
    }
    return res;
  }
}

function cretaeSetter () {
  return function setter (target, key, value, receiver) {
    // 检查一个属性是否已经存在
    const hasKey = hasOwn(target, key);

    const oldValue = target[key];

    const res = Reflect.set(target, key, value, receiver); // target[key] = value

    if (!hasKey) {
      // 新增属性
      trigger(target, TriggerOpTypes.ADD, key, value);
    } else if (hasChanged(value, oldValue)) {
      // 设置属性值
      trigger(target, TriggerOpTypes.SET, key, value, oldValue);
    }

    return res;
  }
}

export const mutableHandler = {
  get,
  set
}