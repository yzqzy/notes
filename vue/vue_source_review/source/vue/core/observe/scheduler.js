import { nextTick } from '../util/next-tick';

const queue = [];
let has = {};

function flushSchedulerQueue () {
  queue.forEach(watcher => watcher.run());
  has = [];
  queue.length = 0;
}

export function queueWatcher (watcher) {
  const id = watcher.id;

  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);

    // 延迟清空队列
    // setTimeout(flushSchedulerQueue);
    nextTick(flushSchedulerQueue);
  }
}