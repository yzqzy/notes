import Vue from '../../../core/index';
import { mountComponent } from '../../../core/instance/lifecycle';
import { query } from '../util/index';

Vue.prototype.$mount = function (el) {
  el = el ? query(el) : undefined;
  return mountComponent(this, el);
}

export default Vue;