import { useReactive } from ".";
import { hasOwnProperty, isEqual, isObject } from "../../shared/utils";

const get = createGetter(),
      set = createSetter();

function createGetter () {
  return function get (target, key, receiver) {
    const res = Reflect.get(target, key, receiver);

    console.log('get：', target[key]);

    if (isObject(res)) {
      return useReactive(res);
    }

    return res;
  }
}

function createSetter () {
  return function set (target, key, value, receiver) {
    const isKeyExist = hasOwnProperty(target, key),
          oldVal = target[key],
          res = Reflect.set(target, key, value, receiver);

    if (!isKeyExist) {
      console.log('add');

    } else if (!isEqual(value, oldVal)) {
      console.log('update');
      
    }

    return res;
  }
}

const mutableHandler = {
  get,
  set
}

export {
  mutableHandler
}