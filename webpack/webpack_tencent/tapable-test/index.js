// const { SyncHook } = require('tapable');

// const hook = new SyncHook(['val1', 'val2', 'val3']);

// hook.tap('hook', (v1, v2, v3) => {
//   console.log(v1, v2, v3);
// });

// hook.call(1, 2, 3);


// const { SyncHook, AsyncSeriesHook } = require('tapable');

// class Car {
//   constructor () {
//     this.hooks = {
//       accelerate: new SyncHook(['newspeed']),
//       brake: new SyncHook(),
//       calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList'])
//     }
//   }
// }

// const car = new Car();

// // 绑定同步钩子
// car.hooks.brake.tap('WarningLampPlugin', () => {
//   console.log('WarningLampPlugin');
// });

// // 绑定同步钩子，传参
// car.hooks.accelerate.tap('LoggerPlugin', newSpeed => console.log(`Accelerating to ${ newSpeed }`));

// // 绑定一个异步 promise 钩子
// car.hooks.calculateRoutes.tapPromise('calculateRoutes tapPromise', (source, target, routesList) => {
//   console.log('source', source);

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(`tapPromise to ${ source } ${ target } ${ routesList }`);
//       resolve();
//     }, 1000);
//   });
// });


// // 执行同步钩子
// car.hooks.brake.call();
// car.hooks.accelerate.call(10);

// console.time('cost');

// // 执行异步钩子
// car.hooks.calculateRoutes.promise('Async', 'hook', 'demo')
//   .then(() => {
//     console.timeEnd('cost');
//   })
//   .catch(() => {
//     console.error(err);
//     console.timeEnd('cost');
//   })



// 模拟插件执行

const Plugin = require('./plugin'),
      Compiler = require('./compiler');

const options = {
  plugins: [ new Plugin() ]
}

const compiler = new Compiler();

for (const plugin of options.plugins) {
  if (typeof plugin === 'function') {
    plugin.call(compiler, compiler);
  } else {
    plugin.apply(compiler);
  }
}

compiler.run();
