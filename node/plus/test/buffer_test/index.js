const b1 = Buffer.alloc(10);
const b2 = Buffer.allocUnsafe(10);

console.log(b1); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(b2); // <Buffer 00 00 00 00 00 00 00 00 00 00>


const b3 = Buffer.from('1');

console.log(b3); // <Buffer 31>