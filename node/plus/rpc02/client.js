const net = require('net');

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

// socket.write('hello world.');

const lessonids = [
  0,
  1,
  2,
  3,
  4,
  5
];

let buffer = Buffer.alloc(2);
let index = Math.floor(Math.random() * lessonids.length);

buffer.writeInt16BE(lessonids[index]);

socket.write(buffer);

socket.on('data', (buffer) => {
  console.log(index, buffer.toString());

  buffer = Buffer.alloc(2);
  index = Math.floor(Math.random() * lessonids.length);

  buffer.writeInt16BE(lessonids[index]);

  socket.write(buffer);
});