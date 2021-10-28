;(function () {
  const ctx = {};

  window.app1 = {
    bootstrap: () => {
      return Promise.resolve().then(() => {
        console.log('bootstraping');
        ctx.container = document.getElementById('app');
      });
    },
    mount: () => {
      return Promise.resolve().then(() => {
        console.log('mounting');
        ctx.container.innerHTML = 'Hello from app1!';
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