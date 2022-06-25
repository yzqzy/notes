// const vnode = {
//   type: 'h1',
//   children: 'hello'
// };

// // 创建渲染器
// const renderer = createRenderer();
// // 调用 render 函数渲染该 vnode
// renderer.render(vnode, document.querySelector('#app'));

// const vnode = {
//   type: 'h1',
//   children: 'hello'
// };
// // 创建渲染器
// const renderer = createRenderer({
//   // 创建元素
//   createElement (tag) {
//     return document.createElement(tag);
//   },
//   // 设置元素的文本节点
//   setElementText (el, text) {
//     el.textContent = text;
//   },
//   // 给指定的 parent 下添加指定元素
//   insert (el, parent, anchor = null) {
//     parent.insertBefore(el, anchor);
//   }
// });

// // 调用 render 函数渲染该 vnode
// renderer.render(vnode, document.querySelector('#app'));

const vnode = {
  type: 'h1',
  children: 'hello'
};
const container = { type: 'root' };

// 创建渲染器
const renderer = createRenderer({
  createElement (tag) {
    console.log(`创建元素 ${ tag }`);
    return { tag };
  },
  setElementText (el, text) {
    console.log(`设置 ${ JSON.stringify(el) } 的文本内容：${ text }`);
    el.text = text;
  },
  insert (el, parent, anchor = null) {
    console.log(`将 ${ JSON.stringify(el) } 添加到 ${ JSON.stringify(parent) } 下`);
    parent.children = el;
  }
});

renderer.render(vnode, container);
