import { MOUNTED, MOUNTING, NOT_MOUNTED, SKIP_BECAUSE_BROKEN } from "../application/app.helpers";
import { reasonableTime } from "../application/timeouts";
import { toUnmountPromise } from "./unmount";

export function toMountPromise (app) {
  if (app.status !== NOT_MOUNTED) {
    return Promise.resolve(app);
  }

  app.status = MOUNTING;

  return reasonableTime(
      app.mount(),
      app.timeouts.mount,
      `${app.name} mounting`
    )
    .then(() => {
      app.status = MOUNTED;
      return app;
    })
    .catch((e) => {
      app.status = MOUNTED;
      console.log(e);
      return toUnmountPromise(app);
    });
}