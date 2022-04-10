// const { effect, ref } = VueReactivity;

// function renderer (domString, container) {
//   container.innerHTML = domString;
// }

// const count = ref(1);

// effect(() => {
//   renderer(`<h1>${ count.value }</h1>`, document.getElementById('app'));
// });

// count.value++;


// function createRenderer () {
//   function render (vnode, container) {
//     // ...
//   }
//   return render;
// }


function createRenderer () {
  function render (vnode, container) {
    if (vnode) {
      // 新 node 存在，将其与旧 vnode 一起传递给 patch 函数，进行打补丁
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // 旧 vnode 存在且新 vnode 不存在，说明是卸载（unmount）操作
        // 只需要将 container 内的 DOM 清空即可
        container.innerHTML = '';
      }
    }
    // 把 vnode 存在到 container._vnode 下，这里就是后续渲染中的旧 vnode
    container._vnode = vnode;
  }

  function hydrate (vnode, container) {
    // ...
  }

  return {
    render,
    hydrate
  };
}

const renderer = createRenderer();

// 首次渲染
renderer.render(vnode1, document.querySelector('#app'));
// 第二次渲染
renderer.render(vnode2, document.querySelector('#app'));
// 第三次渲染
renderer.render(null, document.querySelector('#app'));