// 首次渲染、比对（diff算法）

/**
 * @description 渲染DOM节点
 * @param {object} vnode 虚拟DOM
 * @param {object} container 节点
 * @return {void}
 */
export function render (vnode, container) {
  let el = createElm(vnode);
  container.appendChild(el);
}

function createElm (vnode) {
  let { tag, props, key, children, text } = vnode;

  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag);

    updateProperties(vnode);

    children.forEach(child => {
      return render(child, vnode.el);
    });
  } else {
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}

function updateProperties (vnode, oldProps = {}) {
  let newProps = vnode.props || {},
      el = vnode.el;

  let oldStyle = oldProps.style || {},
      newStyle = newProps.style || {};

  for (let key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = '';
    }
  }

  for (let key in oldProps) {
    if (key in oldProps) {
      if (!newProps[key]) {
        delete el[key];
      }
    }
  }
   
  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
      return;
    }

    if (key === 'class') {
      el.className = newProps[key];
      return;
    }

    el[key] = newProps[key];
  }
}

/**
 * @description vdom更新
 * @param {object} oldVnode - 老节点 
 * @param {object} newVnode - 新节点
 * @return {object}
 */
export function patch (oldVnode, newVnode) {
  // 1. 标签不同
  if (oldVnode.tag != newVnode.tag) {
    oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el);
  }

  // 2. 文本节点
  if (!oldVnode.tag) {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.el.textContent = newVnode.text;
    }
  }

  // 3. 标签相同，属性不同
  let el = newVnode.el = oldVnode.el; // 复用节点
  updateProperties(newVnode, oldVnode.props);

  let oldChildren = oldVnode.children || [],
      newChildren = newVnode.children || [];

  if (oldChildren.length > 0 && newChildren.length > 0) {
    // 1. 老节点有子节点，新节点也有子节点
    updateChildren(el, oldChildren, newChildren);    
  } else if (oldChildren.length > 0) {
    // 2. 老节点有子节点，新节点没有子节点
    el.innerHTML= '';
  } else {
    // 3. 老节点没有子节点，新节点有子节点
    for (let i = 0; i < newChildren.length; i++) {
      let child = newChildren[i];
      el.appendChild(createElm(child));
    }
  }

  return el;
}

/**
 * @description 更新子节点
 * @param {object} parent 父节点
 * @param {object} oldChildren 旧子节点
 * @param {object} newChildren 新子节点
 * @return {void}
 */
function updateChildren (parent, oldChildren, newChildren) {
  let oldStartIndex = 0,
      oldStartVnode = oldChildren[0],
      oldEndIndex = oldChildren.length - 1,
      oldEndVnode = oldChildren[oldEndIndex];

  let newStartIndex = 0,
      newStartVnode = newChildren[0],
      newEndIndex = newChildren.length - 1,
      newEndVnode = newChildren[newEndIndex];

  function createKeyToOldIdx (children) {
    let map  = {};
    children.forEach((item, index) => {
      map[item.key] = index;
    });
    return map;
  }

  let map = createKeyToOldIdx(oldChildren);

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex];
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIndex];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      // head-head
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      // foot-foot
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // head-foot
      patch(oldStartVnode, newEndVnode);
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // foot-head
      patch(oldEndVnode, newStartVnode);
      parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else {
      // disorder
      let moveIndex = map[newStartVnode.key];

      console.log(moveIndex, map, oldChildren);

      if (moveIndex == undefined) {
        parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
      } else {
        console.log(oldChildren);

        let moveVnode = oldChildren[moveIndex];
        oldChildren[moveIndex] = undefined;
        parent.insertBefore(moveVnode.el, oldStartVnode.el);
        patch(moveVnode, newStartVnode);
      }

      newStartVnode = newChildren[++newStartIndex];
    }
  }

  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      let refElm = newChildren[newEndIndex + 1].el;
      parent.insertBefore(createElm(newChildren[i]), refElm);
    }
  }

  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      let child = oldChildren[i];

      if (child != undefined) {
        parent.removeChild(child.el);
      }
    }
  }
}

/**
 * @description 判断是不是同一个节点
 * @param {object} oldVnode 老节点
 * @param {object} newVnode 新节点
 * @return {void}
 */
function isSameVnode (oldVnode, newVnode) {
  return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key);
}