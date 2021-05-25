;(function () {
  const ctx = {};

  window.app2 = {
    bootstrap: () => {
      return Promise.resolve().then(() => {
        console.log('bootstraping');
        ctx.container = document.getElementById('app');
      });
    },
    mount: () => {
      return Promise.resolve().then(() => {
        console.log('mounting');
        ctx.container.innerHTML = 'Hello from app2!';
      });
    },
    unmount: () => {
      return Promise.resolve().then(() => {
        console.log('unmounting');
        ctx.container.innerHTML = '';
      });
    },
    timeouts: {
      bootstrap: {
        millseconds: 2000,
        rejectOnTimeout: true
      }
    }
  }
})();