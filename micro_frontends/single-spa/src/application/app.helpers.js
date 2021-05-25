export const NOT_LOADED = 'NOT_LOADED';
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE';
export const NOT_BOOTSTRAPED = 'NOT_BOOTSTRAPED';
export const BOOTSTRAPING = 'BOOTSTRAPING';
export const NOT_MOUNTED = 'NOT_MOUNTED';
export const MOUNTING = 'MOUNTING';
export const MOUNTED = 'MOUNTED';
export const UNMOUNTING = 'UNOUNTING';
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN';
export const LOAD_ERROR = 'LOAD_ERROR';

export function notBroken (app) {
  return app.status !== SKIP_BECAUSE_BROKEN;
}

export function noLoadError (app) {
  return app.status !== LOAD_ERROR;
}

export function notLoaded (app) {
  return app.status === NOT_LOADED;
}

export function isLoaded (app) {
  return app.status !== NOT_LOADED;
}

export function isntActive (app) {
  return app.status !== MOUNTED;
}

export function shouldBeActive (app) {
  try {
    return app.activeWhen(window.location);
  } catch (e) {
    app.status = SKIP_BECAUSE_BROKEN;
    console.log(e);
  }
}

export function shouldntBeActive (app) {
  try {
    return !app.activeWhen(window.location);
  } catch (e) {
    app.status = SKIP_BECAUSE_BROKEN;
    console.log(e);
  }
}

export function isActive (app) {
  return app.status === MOUNTED;
}
