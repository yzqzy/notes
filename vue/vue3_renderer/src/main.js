import { createRenderer, nextTick } from '@vue/runtime-core';
import App from './App.vue';

let canvas,
    ctx;

const angleToRadian = (angle) => {
  return Math.PI / 180 * angle;
}

const drawCircle = (startAngle, endAngle, cx, cy, r, color) => {
  let x = cx + Math.cos(angleToRadian(startAngle)) * r,
      y = cy + Math.sin(angleToRadian(startAngle)) * r;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  ctx.arc(cx, cy, r, angleToRadian(startAngle), angleToRadian(endAngle));
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
}   

const draw = (el, shouldNotClear) => {
  !shouldNotClear && ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (el.tag === 'circle') {
    const { animals, x, y, r } = el;

    let totalCount = animals.reduce((preValue, currentValue) => preValue + currentValue.count, 0);

    let startAngle = 0,
        endAngle = 0;

    

    animals.forEach(animal => {
      endAngle += animal.count / totalCount * 360;
      drawCircle(startAngle, endAngle, x, y, r, animal.color);
      startAngle = endAngle;
    });
  }

  el.childs && el.childs.forEach(child => {
    draw(child, true);
  });
}

const rendererOptions = {
  insert: (child, parent, anchor) => {
    child.parent = parent;
    
    if (!parent.childs) {
      parent.childs = [child];
    } else {
      parent.childs.push(child);
    }

    if (parent.nodeType === 1) {
      draw(child);

      if (child.onClick) {
        canvas.addEventListener('click', () => {
          child.onClick();
          nextTick(() => {
            draw(child)
          });
        }, false);
      }
    }
  },

  remove: child => {},

  createElement: (tag, isSVG, is) => {
    return {
      tag
    }
  },

  createText: text => {},

  createComment: text => {},

  setText: (node, text) => {},

  setElementText: (el, text) => {},

  parentNode: node => {},

  nextSibling: node => {},

  querySelector: selector => {},

  setScopeId (el, id) {},

  cloneNode(el) {},

  insertStaticContent (content, parent, anchor, isSVG) {},

  patchProp (el, key, prevValue, nextValue) {
    el[key] = nextValue;
  }
}

const createCanvasApp = (...args) => {
  const app = createRenderer(rendererOptions).createApp(...args);

  const { mount } = app;

  app.mount = function (selector) {
    let el = document.querySelector(selector);

    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.border = '1px solid #000';

    el.appendChild(canvas);

    mount(canvas);
  }

  return app;
}

createCanvasApp(App).mount('#app');
