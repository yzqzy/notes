// const immediateId = setImmediate(() => {
// 	console.log('over'); 
//   console.log('over'); 
//   console.log('over'); 
//   console.log('over'); 
// });

// console.log('starting', immediateId);

// Immediate {
//   _idleNext: null,
//   _idlePrev: null,
//   _onImmediate: [Function (anonymous)],
//   _argv: undefined,
//   _destroyed: false,
//   [Symbol(refed)]: true,
//   [Symbol(asyncId)]: 2,
//   [Symbol(triggerId)]: 1
// }


// const fs = require('fs');

// fs.readFile(__filename, () => {
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate');
//   });
// });


const channel = new MessageChannel();

const { port1, port2 } = channel;


port1.postMessage('I am PORT-1');
port2.postMessage('I am PORT-2');




// console.log(port1);
// console.log(port2);

// MessageChannel {
//   port1: MessagePort [EventTarget] {
//     active: true,
//     refed: false,
//     [Symbol(kEvents)]: SafeMap(2) [Map] {
//       'newListener' => [Object],
//       'removeListener' => [Object]
//     },
//     [Symbol(events.maxEventTargetListeners)]: 10,
//     [Symbol(events.maxEventTargetListenersWarned)]: false,
//     [Symbol(kNewListener)]: [Function (anonymous)],
//     [Symbol(kRemoveListener)]: [Function (anonymous)],
//     [Symbol(nodejs.internal.kCurrentlyReceivingPorts)]: undefined
//   },
//   port2: MessagePort [EventTarget] {
//     active: true,
//     refed: false,
//     [Symbol(kEvents)]: SafeMap(2) [Map] {
//       'newListener' => [Object],
//       'removeListener' => [Object]
//     },
//     [Symbol(events.maxEventTargetListeners)]: 10,
//     [Symbol(events.maxEventTargetListenersWarned)]: false,
//     [Symbol(kNewListener)]: [Function (anonymous)],
//     [Symbol(kRemoveListener)]: [Function (anonymous)],
//     [Symbol(nodejs.internal.kCurrentlyReceivingPorts)]: undefined
//   }
// }