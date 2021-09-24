import { updateNodeElement } from "../dom";
import { createTaskQueue, arrified, createStateNode, getTag } from "../misc";

const taskQueue = createTaskQueue();

let subTask = null;
let pendingCommit = null;

const commitAllWork = fiber => {
  // 循环 effects 数组，构建 DOM 节点树
  fiber.effects.forEach(item => {
    if (item.effectTag === 'delete') {
      item.parent.stateNode.removeChild(item.stateNode);
    } else if (item.effectTag === 'update') {
      if (item.type === item.alternate.type) {
        // 节点类型相同
        updateNodeElement(item.stateNode, item, item.alternate);
      } else {
        // 节点类型不同
        item.parent.stateNode.replaceChild(
          item.stateNode,
          item.alternate.stateNode
        )
      }
    } else if (item.effectTag === 'placement') {
      let fiber = item;
      let parentFiber = item.parent;

      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent;
      }

      if (fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });

  // 备份旧根 fiber 对象
  fiber.stateNode.__rootFiberContainer = fiber;
}

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
  }
}

// 构建子级节点关系
const reconcileChildren = (fiber, children) => {
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null; // 子节点的 vritualDOM 对象
  let newFiber = null; // 子级 fiber 对象
  let prevFiber = null; // 上一个兄弟 fiber 对象
  let alternate = null;

  if (fiber.alternate &&  fiber.alternate.child) {
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElements || alternate) {
    // 子级 Virtual DOM 对象
    element = arrifiedChildren[index];

    if (!element && alternate) {
      // 删除操作
      alternate.effectTag = 'delete';
      fiber.effects.push(alternate);
    } else if (element && alternate) {
      // 更新操作
            
      // 子级 fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: 'update',
        parent: fiber,
        alternate
      }

      if (element.type === alternate.type) {
        // 类型相同
        newFiber.stateNode = alternate.stateNode;
      } else {
        // 类型不同
        // 为 fiber 节点添加 DOM 对象或组件实例对象
        newFiber.stateNode = createStateNode(newFiber);
      }
    } else if (element && !alternate) {
      // 初始渲染操作
      
      // 子级 fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: 'placement',
        parent: fiber
      }

      // 为 fiber 节点添加 DOM 对象或组件实例对象
      newFiber.stateNode = createStateNode(newFiber);
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevFiber.siblint = newFiber;
    }

    if (alternate && alternate.siblint) {
      alternate = alternate.siblint;
    } else {
      alternate = null;
    }

    // 更新
    prevFiber = newFiber;

    index++;
  }
}

const executeTask = fiber => {
  if (fiber.tag === 'class_component') {
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    );

    if (currentExecutelyFiber.siblint) {
      return currentExecutelyFiber.siblint;
    }
    
    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }

  if (pendingCommit) {
    // 执行初始渲染
    commitAllWork(pendingCommit);
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