process.on('message', (msg) => {
  console.log('child：', msg);

  process.send('hehe');
});