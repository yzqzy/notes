import { invoke } from './invoke';

const HIJACK_EVENTS_NAME = /^(hashchange|popstate)$/i;

// 缓存 Vue Router 里面的事件处理函数
const EVENT_POOL_HANDlERS = {
  haschange: [],
  popstate: []
}

// 微前端框架先处理 hashchange 或 popstate 事件，然后 VueRouter、React Router 再处理事件

// 微前端框架对于路由处理 
window.addEventListener('hashchange', reroute);

// history API popstate、pushState、replaceState
window.addEventListener('popstate', reroute);

function reroute (e) {
  invoke([], arguments);
}

const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;

// 拦截原生事件
window.addEventListener = function (eventName, handler) {
  if (eventName && HIJACK_EVENTS_NAME.test(eventName)) {
    !~EVENT_POOL_HANDlERS[eventName].indexOf(handler) && EVENT_POOL_HANDlERS[eventName].push(handler);
  } else {
    originalAddEventListener.apply(this, arguments);
  }
}
window.removeEventListener = function (eventName, handler) {
  if (eventName && HIJACK_EVENTS_NAME.test(eventName)) {
    const eventHandlers = EVENT_POOL_HANDlER[eventName];
    !!~eventHandlers.indexOf(handler) && (
      EVENT_POOL_HANDlER[eventName] = eventHandlers.filter(eventHandler => eventHandler !== handler)
    );
  } else {
    originalRemoveEventListener.apply(this, arguments);
  }
}

function mockPopStateEventObject (state) {
  return new PopStateEvent('popstate', { state });
}

const originalPluhState = window.history.pushState;
const originalReplaceState = window.history.replaceState;

window.history.pushState = function (state, title, url) {
  const result = originalPluhState.apply(this, arguments);
  reroute(mockPopStateEventObject(state));
  return result;
}
window.history.replaceState = function (state, title, url) {
  const result = originalReplaceState.apply(this, arguments);
  reroute(mockPopStateEventObject(state));
  return result;
}

export function callCaptureEvents (eventArgs) {
  if (!eventArgs) {
    return;
  }

  if (!Array.isArray(eventArgs)) {
    eventArgs = [eventArgs];
  }

  const name = eventArgs[0].type;
  const eventPool = EVENT_POOL_HANDlERS[name];

  if (!eventPool || eventPool && eventPool.length === 0) {
    return;
  }

  eventPool.forEach(handler => {
    handler.apply(window, eventArgs);
  });
}