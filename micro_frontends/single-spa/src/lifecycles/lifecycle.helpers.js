export function smellsLikeAPromise (promise) {
  return (
    promise && 
    typeof promise.then === 'function' &&
    typeof promise.catch === 'function' 
  )
}

export function flattenFnArray (lifecycle) {
  if (!Array.isArray(lifecycle)) {
    lifecycle = [lifecycle];
  }

  if (lifecycle.length === 0) {
    lifecycle = [() => Promise.resolve({})];
  }

  return () => new Promise((resolve, reject) => {
    waitPromiseFn(0);

    function waitPromiseFn (index) {
      const resultPromise = lifecycle[index]();

      if (!smellsLikeAPromise(resultPromise)) {
        reject(new Error());
      } else {
        resultPromise
          .then(() => {
            if (index >= lifecycle.length - 1) {
              return resolve();
            }
            waitPromiseFn(++index);
          })
          .catch((e) => reject(e));
      }
    }
  });
}