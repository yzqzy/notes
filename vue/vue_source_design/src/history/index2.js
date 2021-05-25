// <div id="container"><span style="color: orange">hello</span>yueluo</div>

/**
 * @requires src/vdom - 解构虚拟DOM方法集合
 */
import { h, render, patch } from '../../source/vue/vdom';

let oldVnode = h('div', { id: 'container' },
                  h('li', { style: { background: 'red' }, key: 'a' }, 'a'),
                  h('li', { style: { background: 'green' }, key: 'b' }, 'b'),
                  h('li', { style: { background: 'blue' }, key: 'c' }, 'c'),
                  h('li', { style: { background: 'orange' }, key: 'd' }, 'd'),
                );

let newVnoe = h('div', { id: 'test' },
                  h('li', { style: { background: 'yellow' }, key: 'e' }, 'e'), 
                  h('li', { style: { background: 'red' }, key: 'a' }, 'a'), 
                  h('li', { style: { background: 'purple' }, key: 'f' }, 'f'),
                  h('li', { style: { background: 'blue' }, key: 'c' }, 'c'),
                  h('li', { style: { background: 'brown' }, key: 'g' }, 'g')
               );

setTimeout(() => {
  patch(oldVnode, newVnoe);
}, 3000)

render(
  oldVnode,
  document.getElementById('app')
);