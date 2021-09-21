export default function createTaskQueue () {
  const taskQueue = [];

  return {
    push: item => taskQueue.push(item),
    pop: () => taskQueue.shift(),
    isEmpty: () => taskQueue.length === 0
  };
}