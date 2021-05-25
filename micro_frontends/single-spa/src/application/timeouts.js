const globalTimeoutConfig = {
  bootstrap: {
    milliseconds: 3000,
    rejectOnTimeout: false
  },
  mount: {
    milliseconds: 3000,
    rejectOnTimeout: false
  },
  unmount: {
    milliseconds: 3000,
    rejectOnTimeout: false
  }
}

export function reasonableTime (lifecyclePromise, lifecycleTimeoutConfig, description) {
  return new Promise((resolve, reject) => {
    let finished = false;

    lifecyclePromise.then(data => {
      finished = true;
      resolve(data)
    }, (e) => {
      finished = true;
      reject(e);
    })

    setTimeout(() => {
      if (finished) {
        return;
      }

      if (lifecycleTimeoutConfig.rejectOnTimeout) {
        reject(`${description} did not resolve or reject for ${lifecycleTimeoutConfig.milliseconds}.`);
      } else {
        console.log('time exceed');
      }
    }, lifecycleTimeoutConfig.milliseconds);
  });
}

export function ensureValidAppTimeouts (timeouts = {}) {
  return {
    ...globalTimeoutConfig,
    ...timeouts
  }
}