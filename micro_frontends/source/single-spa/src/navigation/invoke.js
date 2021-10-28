import { isStarted } from '../start';
import { getAppsToLoad, getAppsToUnmount, getAppsToMount, getMountedApps } from '../application/apps';
import { toLoadPromise } from '../lifecycles/load';
import { toBootStrapPromise } from '../lifecycles/bootstrap';
import { toMountPromise } from '../lifecycles/mount';
import { toUnmountPromise } from '../lifecycles/unmount';
import { callCaptureEvents } from './hijackLocation';

let appChangeUnderway = false;
let changeQueue = [];

export function invoke (pendingPromises = [], eventArgs) {
  if (appChangeUnderway) {
    return new Promise((resolve, reject) => {
      changeQueue.push({
        success: resolve,
        failure: reject,
        eventArgs
      });
    });
  }

  appChangeUnderway = true;

  if (isStarted()) {
    performAppChanges();
  } else {
    loadApps();
  }
  
  function loadApps () {
    const loadPromises = getAppsToLoad().map(toLoadPromise);
    return Promise.all(loadPromises).then(() => {
      finish();
      callAllCapturedEvents();
    }).catch(e => {
      console.log(e);
      callAllCapturedEvents();
    });
  }

  function performAppChanges () {
    // 卸载需要卸载的 App
    let unmountApps = getAppsToUnmount();
    let unmountPromises = Promise.all(unmountApps.map(toUnmountPromise));

    // 加载需要加载的 App
    let loadApps = getAppsToLoad();
    let loadPromises = loadApps.map(app => {
    return toLoadPromise(app).then((app) => {
      return toBootStrapPromise(app)
              .then(toUnmountPromise)
              .then(toMountPromise);
    });
    });

    // 挂载需要挂载的 App
    let mountApps = getAppsToMount().filter(app => loadApps.indexOf(app) === -1);
    let mountPromises = mountApps.map((app) => {
      return toBootStrapPromise(app)
              .then(toUnmountPromise)
              .then(toMountPromise);
    });

    return unmountPromises
      .then(() => {
        let loadAndMountPromises = loadPromises.concat(mountPromises);
        return Promise.all(loadAndMountPromises)
                .then(() => {
                  finish();
                  callAllCapturedEvents();
                })
                .catch(e => {
                  pendingPromises.forEach((promise => promise.failure(e)));
                  callAllCapturedEvents();
                });
      })
      .catch(e => {
        console.log(e);
        callAllCapturedEvents();
      });
  }

  function finish () {
    let returnValue = getMountedApps();

    if (pendingPromises.length) {
      pendingPromises.forEach(promise => promise.success(returnValue));
    }

    appChangeUnderway = false;

    if (changeQueue.length) {
      const nextchangeQueue = changeQueue;
      changeQueue = [];
      invoke(nextchangeQueue);
    }

    return returnValue;
  }

  function callAllCapturedEvents () {
    const eventsChangeQueue = pendingPromises && pendingPromises.length
      && pendingPromises.filter(item => item.eventArgs);

    if (eventsChangeQueue.length > 0) {
      eventsChangeQueue.forEach(item => {
        callCaptureEvents(item.eventArgs);
      });
    }
  }
}