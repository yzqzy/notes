const { CircularQueue } = require('./queue');


const arr = new CircularQueue(8);

arr.enqueue(1);
arr.enqueue(2);
arr.enqueue(3);
arr.dequeue();
arr.dequeue();
arr.enqueue(4);
arr.enqueue(5);
arr.enqueue(6);
arr.enqueue(7);
arr.enqueue(8);
arr.enqueue(9);

console.log(arr);