import createApp from './main';

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    const url = context.url;
    router.push(url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (matchedComponents.length > 0) {
        Promise.all(
          matchedComponents.map(comp => {
            if (comp.asyncData) {
              return comp.asyncData(store);
            }
          })
        ).then(() => {
          context.state = store.state;
          resolve(app);
        }, reject);
      } else {
        reject({ code: 404 });
      }
    }, reject);
  });
}
