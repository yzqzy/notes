const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (buffer) => {
    const lessonid = buffer.readInt16BE();

    setTimeout(() => {
      socket.write(
        Buffer.from(data[lessonid])
      );
    }, 500);
  });
});

server.listen(4000);

const data = [
  'HTML',
  'CSS',
  'JavaScript',
  'Browser',
  'Network',
  'NodeJS'
];

