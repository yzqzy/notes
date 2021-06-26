const net = require('net');

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

const lessonids = [0, 1, 2, 3, 4, 5];

let buffer;
let id;

socket.on('data', (buffer) => {
  const seqBuffer = buffer.slice(0, 2);
  const titleBuffer = buffer.slice(2);

  console.log(seqBuffer.readInt16BE(), titleBuffer.toString());
});

let seq = 0;

setInterval(() => {
  id = getRandomId();
  socket.write(encode(id));
}, 50);

function encode (index) {
  buffer = Buffer.alloc(6);

  buffer.writeInt16BE(seq);
  buffer.writeInt32BE(lessonids[index], 2);

  console.log(seq, lessonids[index]);

  seq++;

  return  buffer;
}

function getRandomId () {
  return Math.floor(Math.random() * lessonids.length);
}