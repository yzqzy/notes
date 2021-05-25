module.exports = class Plugin {
  constructor () {}

  apply (compiler) {
    // 绑定同步钩子
    compiler.hooks.brake.tap('WarningLampPlugin', () => {
      console.log('WarningLampPlugin');
    });
    // 绑定同步钩子，传参
    compiler.hooks.accelerate.tap('LoggerPlugin', newSpeed => console.log(`Accelerating to ${ newSpeed }`));
    // 绑定一个异步 promise 钩子
    compiler.hooks.calculateRoutes.tapPromise('calculateRoutes tapAsync', (source, target, routesList) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`tapPromise to ${ source } ${ target } ${ routesList }`);
          resolve();
        }, 1000);
      });
    });
  }
}