import Vue from './runtime/index';
import { query } from './util/index';

const mount = Vue.prototype.$mount;

Vue.prototype.$mount = function (el) {
  el = el && query(el);
  return mount.call(this, el);
}

export default Vue;