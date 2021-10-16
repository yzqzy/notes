const WebSocket = require('ws');
const EventEmitter = require('events');

const signal = new EventEmitter();
const ws = new WebSocket('ws://127.0.0.1:8010');

ws.on('open', () => {
  console.log('connect success');
});

ws.on('message', message => {
  let data;

  console.log('onmessage', message);

  try {
    data = JSON.parse(message);
  } catch (e) {
    console.log('parse error', e);
  }

  console.log('trgger', data.event, data.data);

  signal.emit(data.event, data.data);
});

function send (event, data) {
  ws.send(JSON.stringify({ event, data }));
}

function invoke (event, data, answerEvent) {
  return new Promise((resolve, reject) => {
    // 发送 event 事件
    send(event, data);
    // 订阅时间
    signal.once(answerEvent, (controlCode) => {
      resolve({ code: controlCode });
    });
    // 超时处理
    setTimeout(() => {
      reject('timeout');
    }, 5 * 1000);
  });
}

signal.send = send;
signal.invoke = invoke;

module.exports = signal;
