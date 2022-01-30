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


// const channel = new MessageChannel();

// const { port1, port2 } = channel;


// port1.postMessage('I am PORT-1');
// port2.postMessage('I am PORT-2');




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



// import port2 from './demo.js';

// ;(() => {
//   port2.postMessage('This is new title');

//   port2.onmessage = (e) => {
//     console.log(e.data);
//   }
// })();



// const oElem = document.getElementById('box');

// let start;

// function step (timestamp) {
//   if (start === undefined) start = timestamp;
    
//   const elapsed = timestamp - start;

//   oElem.style.transform = `translateX(${ Math.min(0.1 * elapsed, 200) }px)`;

//   if (elapsed < 2000) {
//     window.requestAnimationFrame(step);
//   }
// }

// window.requestAnimationFrame(step);

// const oElem = document.getElementById('box');

// let px = 0;
// let t = null

// function step () {
//   px++;

//   oElem.style.transform = `translateX(${ px }px)`;

//   if (px >= 200) {
//     clearInterval(t);
//   }
// }

// t = setInterval(step, 1000 / 60);


function cb (mutationList, observer) {
  console.log(mutationList, observer);
}

const oTarget = document.getElementById('app');
const observer = new MutationObserver(cb);

observer.observe(oTarget, {
  attributes: true, // 监视元素属性变更
});