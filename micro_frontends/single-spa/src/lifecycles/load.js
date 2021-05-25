import {
  NOT_LOADED,
  LOADING_SOURCE_CODE,
  NOT_BOOTSTRAPED,
  SKIP_BECAUSE_BROKEN,
  LOAD_ERROR
} from "../application/app.helpers";
import { ensureValidAppTimeouts } from "../application/timeouts";
import {flattenFnArray, smellsLikeAPromise } from "./lifecycle.helpers";

// 返回 Promise
export function toLoadPromise (app) {
  if (app.status !== NOT_LOADED) {
    return Promise.resolve(app);
  }

  app.status = LOADING_SOURCE_CODE;

  let loadPromise = app.loadAppFn();

  if (!smellsLikeAPromise(loadPromise)) {
    app.status = SKIP_BECAUSE_BROKEN;
    return Promise.reject(new Error());
  }

  return loadPromise
    .then(appOptions => {
      if (typeof appOptions !== 'object') {
        throw new Error();
      }

      let errors = [];

      const lifecycles = ['bootstrap', 'mount', 'unmount'];

      lifecycles.forEach(lifecycles => {
        if (!appOptions[lifecycles]) {
          errors.push(`app lifecycle ${lifecycles} not exist.`);
        }
      });

      if (errors.length) {
        app.status = SKIP_BECAUSE_BROKEN;
        console.log(errors);
        return app;
      }

      app.status = NOT_BOOTSTRAPED;
      app.bootstrap = flattenFnArray(appOptions.bootstrap);
      app.mount = flattenFnArray(appOptions.mount);
      app.unmount = flattenFnArray(appOptions.unmount);
      app.timeouts = ensureValidAppTimeouts(appOptions.timeouts);
      return app;
    })
    .catch(e => {
      app.status = LOAD_ERROR;
      return app;
    });
}