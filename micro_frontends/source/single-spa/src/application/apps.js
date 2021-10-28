import {
  NOT_LOADED,
  notBroken, noLoadError, notLoaded,
  isLoaded, isActive, isntActive,
  shouldBeActive, shouldntBeActive
} from './app.helpers';
import { invoke } from '../navigation/invoke';

const apps = [];

export function registerApplication (appName, appOrloadAppFn, activeWhen, customProps = {}) {
  if (!appName || typeof appName !== 'string') {
    throw new Error('App name should be a non empty string.')
  }

  if (!appOrloadAppFn) {
    throw new Error('Load App function is required.');
  }

  if (typeof appOrloadAppFn !== 'function') {
    appOrloadAppFn = () => {
      return Promise.resolve(appOrloadAppFn);
    }
  }

  if (typeof activeWhen != 'function') {
    throw new Error('activewhen should be a function.');
  }

  apps.push({
    name: appName,
    loadAppFn: appOrloadAppFn,
    activeWhen,
    customProps,
    status: NOT_LOADED
  });

  invoke();
}

export function getAppsToLoad () {
  return apps.filter(notBroken)
              .filter(noLoadError)
             .filter(notLoaded)
             .filter(shouldBeActive);
}

export function getAppsToUnmount () {
  return apps.filter(notBroken)
             .filter(isActive)
             .filter(shouldntBeActive);
}

export function getAppsToMount () {
  return apps.filter(notBroken)
             .filter(isLoaded)
             .filter(isntActive)
             .filter(shouldBeActive);
}

export function getMountedApps () {
  return apps.filter(isActive);
}