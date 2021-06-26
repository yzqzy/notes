const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // 子进程心跳检测
  for (let i = 0; i < os.cpus().length / 2; i++) {
    const worker = cluster.fork();

    let missedPing = 0;
    
 
    const inter = setInterval(() => {
      worker.send('ping');
      missedPing++;

      if (missedPing >= 3) {
        clearInterval(inter);
        process.kill(worker.process.pid);
      }
    }, 3000);

    worker.on('message', (msg) => {
      if (msg === 'pong') {
        missedPing--;
      }
    });
  }

  // 子进程退出后，新开子进程
  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork();
    }, 5000);
  });

 

} else {
  require('./app');

  // 心跳处理
  process.on('message', (msg) => {
    if (msg === 'ping') {
      process.send('pong');
    }
  });

  // 错误捕获
  process.on('uncaughtException', (err) => {
    console.error(err);

    process.exit(1);
  });

  // 内存泄漏监控
  setInterval(() => {
    if (process.memoryUsage().rss > 734003200) {
      console.log('oom');
      process.exit(1);
    }
  }, 5000);
}