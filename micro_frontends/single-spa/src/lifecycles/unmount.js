import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from "../application/app.helpers";
import { reasonableTime } from "../application/timeouts";

export function toUnmountPromise (app) {
  if (app.status !== MOUNTED) {
    return Promise.resolve(app);
  }

  app.status = UNMOUNTING;
  
  return reasonableTime(
      app.unmount(),
      app.timeouts.unmount,
      `${app.name} unmounting`
    )
    .then(() => {
      app.status = NOT_MOUNTED;
      return app;
    })
    .catch((e) => {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log(e);
      return app;
    });
}