const callbacks = [];

function flushCallbacks () {
  callbacks.forEach(cb => cb());
}

let timerFunc;

if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks);
  };
} else if (MutationObserver) {
  let counter = 0;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  }
} else if (setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  }
}

export function nextTick (cb) {
  callbacks.push(cb);
  timerFunc();
}