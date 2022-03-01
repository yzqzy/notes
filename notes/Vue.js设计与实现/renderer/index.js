const vnode = {
  tag: 'div',
	props: {
    onClick: () => alert('hello')
  },
  children: 'click me'
};

function renderer (vnode, container) {
  const el = document.createElement(vnode.tag);

  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(
        key.substr(2).toLowerCase(),
        vnode.props[key]
      )
    }
  }

  if (typeof vnode.children === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'function') {
    mountComponent(vnode, container);
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el));
  } 

  container.appendChild(el);
}

function mountElement (vnode, container) {
  
}

renderer(vnode, document.body);