import { BOOTSTRAPING, NOT_BOOTSTRAPED, NOT_MOUNTED, SKIP_BECAUSE_BROKEN } from "../application/app.helpers";
import { reasonableTime } from "../application/timeouts";

export function toBootStrapPromise (app) {
  // App 启动
  if (app.status !== NOT_BOOTSTRAPED) {
    return Promise.resolve(app);
  }

  app.status = BOOTSTRAPING;

  return reasonableTime(
      app.bootstrap(),
      app.timeouts.bootstrap,
      `${app.name} bootstraping`
    )
    .then(() => {
      app.status = NOT_MOUNTED;
      return app;
    })
    .catch(e => {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log(e);
      return app;
    });
}