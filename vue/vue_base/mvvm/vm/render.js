import { eventFormat, stateFormat } from './index';

export function createApp (root, rootDom) {
  const { template, state, methods } = typeof root === 'function' ? root() : root;

  rootDom.innerHTML = render(template, state);
}

export function render (template, state) {
  template = eventFormat(template);
  template = stateFormat(template, state);

  return template;
}