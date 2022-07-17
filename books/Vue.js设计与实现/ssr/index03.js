const MyComponent = {
  name: 'App',
  steup() {
    const str = ref('foo')

    return () => {
      return {
        type: 'div',
        children: [
          {
            type: 'span',
            children: str.value,
            props: {
              onClick: () => {
                str.value = 'bar'
              }
            }
          },
          {
            type: 'span', children: 'baz'
          }
        ]
      }
    }
  }
}

const CompVNode = {
  type: MyComponent
}


function createRenderer(options) {
  function hydrate(vnode, container) {
    // 从容器的第一个子节点开始
    hydrateNode(container.firstChild, vnode)
  }

  function hydrateNode(node, vnode) {
    const { type } = vnode;

    // 1. 让 vnode.el 引用真实 DOM
    vnode.el = node

    // 2. 检查虚拟 DOM 的类型，如果是组件，调用 mountComponent 函数完成激活
    if (typeof type === 'object') {
      mountComponent(vnode, container, null)
    } else if (typeof type === 'string') {
      // 3. 检查真实 DOM 的类型与虚拟 DOM 的类型是否匹配
      if (node.nodeType !== 1) {
        console.error('mismatch')
        console.error('服务端渲染的真实 DOM 节点是：', node)
        console.error('客户端渲染的真实 DOM 节点是：', vnode)
      } else {
        // 4. 如果是普通元素，调用 hydrateElement 完成激活
        hydrateElement(node, vnode)
      }
    }

    // 5. hydrateNode 函数需要返回当前节点的下一个兄弟节点，以便继续进行后续的激活操作
    return node.nextSibling
  }

  // 激活普通元素类型的节点
  function hydrateElement(el, vnode) {
    // 1. 为 DOM 元素添加事件
    if (vnode.props) {
      for (const key in vnode.props) {
        // 只有事件类型的 props 需要处理
        if (/^on/.test(key)) {
          patchProps(el, key, null, vnode.props[key])
        }
      }
    }
    // 递归激活子节点
    if (Array.isArray(vnode.children)) {
      // 从第一个子节点开始
      let nextNode = el.firstChild
      const len = vnode.children.length
      for (let i = 0; i < len; i++) {
        // 激活子节点，注意，每当激活一个子节点，hydrateNode 函数都会返回当前子节点的下一个兄弟节点
        nextNode = hydrateNode(nextNode, vnode.children[i])
      }
    }
  }

  function mountComponent(vnode, container, anchor) {
    // ...

    instance.update = effect(() => {
      const subTree = render.call(renderContext, renderContext)
      if (!subTree.isMounted) {
        beforeMount && beforeMount.call(renderContext)
        // 如果 vnode.el 存在，则意味着要执行激活
        if (vnode.el) {
          // 直接调用 hydrateNode 完成激活
          hydrateNode(vnode.el, subTree)
        } else {
          // 正常挂载
          patch(null, subTree, container, anchor)
        }
        instance.isMounted = true
        mounted && mounted.call(renderContext)
        instance.mounted && instance.mounted.forEach(hook => hook.call(renderContext))
      } else {
        beforeUpdate && beforeUpdate.call(renderContext)
        patch(instance.subTree, subTree, container, anchor)
        updated && updated.call(renderContext)
      }
      instance.subTree = subTree
    }, {
      schedular: queueJob
    })
  }

  return {
    render,
    hydrate
  }
}
