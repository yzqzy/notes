// const buffer1 = Buffer.from('yueluo.com');
// const buffer2 = Buffer.from([1, 2, 3, 4]);

// const buffer3 = Buffer.alloc(20);

// console.log(buffer1);
// console.log(buffer2);
// console.log(buffer3);



// buffer2.writeInt8(12, 1);
// console.log(buffer2);

// buffer2.writeInt16BE(512, 2);
// console.log(buffer2);

// buffer2.writeInt16LE(512, 2);
// console.log(buffer2);


const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');

const testProto = fs.readFileSync(path.resolve(__dirname, './test.proto'), 'utf-8');
const schema = protobuf(testProto);

console.log(schema);

const buffer = schema.Column.encode({
  id: 1,
  name: 'NodeJS',
  price: 80.4
});

console.log(schema.Column.decode(buffer));
