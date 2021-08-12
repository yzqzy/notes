;(async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3 * 1000);
  });
})();