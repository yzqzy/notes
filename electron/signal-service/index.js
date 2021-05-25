const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8010 });

const code2ws = new Map();

wss.on('connection', (ws, request) => {
  const code = Math.floor(Math.random() * (999999 - 100000)) + 10000;

  code2ws.set(code, ws);

  ws.sendData = (event, data) => {
    ws.send(JSON.stringify({ event, data }));
  }

  ws.on('message', message => {
    // console.log('on msg：', message);

    let parsedMessage = {};

    try {
      parsedMessage = JSON.parse(message);
    } catch (e) {
      ws.sendError('message invalid');
      console.log('parse message error', e);
      return;
    }

    const { event, data } = parsedMessage;

    switch (event) {
      case 'login':
        ws.sendData('logined', code);
        break;
      case 'control':
        const remote = +data.remote;

        if (code2ws.has(remote)) {
          ws.sendData('controlled', { remote });
          ws.sendRemote = code2ws.get(remote).sendData;
          ws.sendRemote('be-controlled', { remote: code });
        }
        break;
      case 'forward':
        ws.sendRemote && ws.sendRemote(data.event, data.data);
        break;
      default:
        break;
    }
  });

  ws.on('close', () => {
    code2ws.delete(code);
    clearTimeout(ws._closeTimeout);
  });

  ws._closeTimeout = setTimeout(() => {
    ws.terminate();
  }, 10 * 60 * 1000);
});