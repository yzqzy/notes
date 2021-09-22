import { createTaskQueue } from "../misc"

const taskQueue = createTaskQueue();
let subTask = null;

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

const executeTask = fiber => {
  
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}