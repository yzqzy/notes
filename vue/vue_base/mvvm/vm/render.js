import { bindEvent } from './compiler/event';
import { eventFormat, stateFormat } from './index';

export function createApp (root, rootDom) {
  const { template, state, methods } = typeof root === 'function' ? root() : root;

  rootDom.innerHTML = render(template, state);

  bindEvent(methods);
}

export function render (template, state) {
  template = eventFormat(template);
  template = stateFormat(template, state);

  return template;
}

export function update (statePool, key, value) {
  const allElements = document.querySelectorAll('*');

  let oItem = null;

  statePool.forEach(item => {
    if (item.state[item.state.length - 1] === key) {
      for (let i = 0; i < allElements.length; i++) {
        oItem = allElements[i];

        const _mark = parseInt(oItem.dataset.mark);

        if (item.mark === _mark) {
          oItem.innerHTML = value;
        }
      }
    }
  });
}