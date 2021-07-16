import { isObject } from '../../shared/utils';
import { mutableHandler } from './mutableHandler';

export function useReactive (target) {
  return createReactObject(target, mutableHandler);
}

function createReactObject (target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }

  const observer = new Proxy(target, baseHandler);

  return observer;
}