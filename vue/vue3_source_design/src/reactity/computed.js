import { isFunction } from "../shared/utils";
import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./opeartion";

export function computed (getterOrOptions) {
  let getter,
      setter;

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = () => {};
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  let dirty = true;
  
  let computed,
      value;

  let runner = effect(getter, {
    lazy: true,
    computed: true,
    schedular: () => {
      if (!dirty) {
        dirty = true;
        trigger(computed, TriggerOpTypes.SET, 'value');
      }
    }
  });

  computed = {
    get value () {
      if (dirty) {
        value = runner();
        dirty = false;
        track(computed, TrackOpTypes.GET, 'value');
      }
      return value;
    },
    set value (newValue) {
      setter(newValue);
    }
  }

  return computed;
}