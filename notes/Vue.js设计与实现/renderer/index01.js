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
    // ...
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
renderer.render(oldVnode, document.querySelector('#app'));
// 第二次渲染
renderer.render(newVnode, document.querySelector('#app'));