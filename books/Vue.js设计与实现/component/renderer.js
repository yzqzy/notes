const { reactive, effect, shallowReactive, shallowReadonly } = VueReactivity;

// 缓存任务队列，用一个 Set 数据结构来表示，可以自动对任务进行去重
const queue = new Set()
// 一个标志，代表是否正在刷新任务队列
let isFlushing = false
// 创建一个立即 resolve 的 Promise 示例
const p = Promise.resolve()

// 调度器的主要函数，用来将一个任务添加到缓冲队列中，并开始刷新队列
function queueJob(job) {
  // 将 job 添加到任务队列 queue 中
  queue.add(job)
  // 如果还没有开始刷新队列
  if (!isFlushing) {
    // 将该标志设置为 true 避免重复刷新
    isFlushing = true
    // 微任务队列中刷新缓冲队列
    p.then(() => {
      try {
        // 执行任务队列中的任务
        queue.forEach(job => job())
      } catch (error) {
        // 重置状态
        isFlushing = false
        queue.length = 0
      }
    })
  }
}

function createRenderer(options) {
  const {
    createElement,
    insert,
    setElementText,
    patchProps,
    createText,
    setText
  } = options

  function mountElement(vnode, container, anchor) {
    const el = vnode.el = createElement(vnode.type)
    
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        patch(null, child, el)
      })
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key])
      }
    }

    insert(el, container, anchor)
  }

  function patchChildren(n1, n2, container) {
    if (typeof n2.children === 'string') {
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c))
      }
      setElementText(container, n2.children)
    } else if (Array.isArray(n2.children)) {
      patchKeyedChildren(n1, n2, container)
    } else {
      if (Array.isArray(n1.children)) {
        n1.children.forEach(c => unmount(c))
      } else if (typeof n1.children === 'string') {
        setElementText(container, '')
      }
    }
  }

  // 快速 Diff
  function patchKeyedChildren (n1, n2, container) {
    const newChildren = n2.children
    const oldChildren = n1.children

    // 更新相同的前置节点
    // 索引 j 指向新旧两组子节点的开头
    let j = 0
    let oldVNode = oldChildren[j]
    let newVNode = newChildren[j]
    // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
    while (oldVNode.key === newVNode.key) {
      // 调用 patch 函数进行更新
      patch(oldVNode, newVNode, container)
      // 更新索引 j，让其递增
      j++
      oldVNode = oldChildren[j]
      newVNode = newChildren[j]
    }

    // 更新相同的后置节点
    // 索引 oldEnd 指向旧的一组子节点的最后一个节点
    let oldEnd = oldChildren.length - 1
    // 索引 newEnd 指向新的一组子节点的最后一个节点
    let newEnd = newChildren.length - 1
    oldVNode = oldChildren[oldEnd]
    newVNode = newChildren[newEnd]
    // while 循环从后向前遍历，直到遇到拥有不同的 key 值的节点为止
    while (oldVNode.key === newVNode.key) {
      // 调用 patch 函数进行更新
      patch(oldVNode, newVNode, container)
      // 递减 oldEnd 和 newEnd
      oldEnd--
      newEnd--
      oldVNode = oldChildren[oldEnd]
      newVNode = newChildren[newEnd]
    }
  
    if (j > oldEnd && j <= newEnd) {
      // 预处理完毕后，如果满足如下条件，则说明 j --> nextEnd 之间的节点应作为新节点插入
      // 锚点的索引
      const anchorIndex = newEnd + 1
      // 锚点元素
      const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
      // 采用 while 循环，调用 patch 函数逐个挂载新增节点
      while (j <= newEnd) {
        patch(null, newChildren[j++], container, anchor)
      }
    } else if (j > newEnd && j <= oldEnd) {
      // j --> oldEnd 之间的节点应该被卸载
      while (j <= oldEnd) {
        unmount(oldChildren[j++])
      }
    } else {
      // else 分支处理非理想情况
      // 新的一组子节点中剩余未处理节点的数量
      const count = newEnd - j + 1
      const source = new Array(count)
      source.fill(-1)
  
      // oldStart 和 newStart 分别为起始索引，即 j
      const oldStart = j
      const newStart = j
      // 新增两个变量，moved 和 pos
      let moved = false
      let pos = 0
      // 构建索引表
      const keyIndx = {}
      for (let i = newStart; i <= newEnd; i++) {
        keyIndx[newChildren[i].key] = i
      }
      // 新增 patched 变量，代表更新过的节点数量
      let patched = 0
      // 遍历旧的一组子节点剩余未处理的节点为止
      for (let i = oldStart; i <= oldEnd; i++) {
        const oldVNode = oldChildren[i]
  
        if (patched <= count) {
          // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
          const k = keyIndx[oldVNode.key]
  
          if (typeof k !== 'undefined') {
            newVNode = newChildren[k]
            // 调用 patch 进行更新
            patch(oldVNode, newVNode, container)
            // 每更新一个节点，将 patched 变量 +1
            patched++
            // 最后填充 source 数组
            source[k - newStart] = i
            // 判断节点是否需要移动
            if (k < pos) {
              moved = true
            } else {
              pos = k
            }
          } else {
            // 没找到
            unmount(oldVNode)
          }
        } else {
          // 如果更新过的节点数量大于需要更新的节点数量，卸载多余的节点
          unmount(oldVNode)
        }
      }
  
      if (moved) {
        // 如果 moved 为真，需要进行 DOM 移动操作
        // 计算最长递增子序列
        const seq = getSequence(source) // [0, 1]
  
        // s 指向最长递增子序列的最后一个元素
        let s = seq.length - 1
        // i 指向新的一组子节点中的最后一个元素
        let i = count - 1
        // for 循环使 i 递减
        for (i; i >= 0; i--) {
          if (source[i] === -1) {
            // 说明索引为 i 的节点是全新的节点，执行挂载操作
            // 该节点在新的一组子节点中的真实位置索引
            const pos = i + newStart
            const newVNode = newChildren[pos]
            // 该节点的下一个节点的位置索引
            const nextPos = pos + 1
            // 锚点
            const anchor = nextPos < newChildren.length
              ? newChildren[nextPos].el
              : null
            // 挂载
            patch(null, newVNode, container, anchor)
          } else if (i !== seq[s]) {
            // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
            // 该节点在新的一组子节点中的真实位置索引
            const pos = i + newStart
            const newVNode = newChildren[pos]
            // 该节点的下一个节点的位置索引
            const nextPos = pos + 1
            // 锚点
            const anchor = nextPos < newChildren.length
              ? newChildren[nextPos].el
              : null
            // 挂载
            insert(newVNode.el, container, anchor)
          } else {
            // i === seq[s] 时，说明该位置的节点不需要移动
            // 只需要让 s 指向下一个位置
            s--
          }
        }
      }
    }
  }
  
  function patchElement(n1, n2) {
    const el = n2.el = n1.el
    const oldProps = n1.props
    const newProps = n2.props
    
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        patchProps(el, key, oldProps[key], newProps[key])
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProps(el, key, oldProps[key], null)
      }
    }

    patchChildren(n1, n2, el)
  }

  const Fragment = Symbol()

  function unmount(vnode) {
    if (vnode.type === Fragment) {
      vnode.children.forEach(c => unmount(c))
      return
    }
    const parent = vnode.el.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
    }
  }

  function patch(n1, n2, container, anchor) {
    if (n1 && n1.type !== n2.type) {
      unmount(n1)
      n1 = null
    }
  
    const { type } = n2
  
    if (typeof type === 'string') {
      if (!n1) {
        mountElement(n2, container, anchor)
      } else {
        patchElement(n1, n2)
      }
    } else if (type === Text) {
      if (!n1) {
        const el = n2.el = createText(n2.children)
        insert(el, container)
      } else {
        const el = n2.el = n1.el
        if (n2.children !== n1.children) {
          setText(el, n2.children)
        }
      }
    } else if (type === Fragment) {
      if (!n1) {
        n2.children.forEach(c => patch(null, c, container))
      } else {
        patchChildren(n1, n2, container)
      }
    } else if (typeof type === 'object') {
      // vnode.type 的值是选项对象，作为组件处理
      if (!n1) {
        // 挂载组件
        mountComponent(n2, container, anchor)
      } else {
        // 更新组件
        patchComponent(n1, n2, anchor)
      }
    }
  }

  function mountComponent(vnode, container, anchor) {
    // 通过 vnode 获取组件的选项对象，即 vnode.type
    const componentOptions = vnode.type
    // 获取组件的渲染函数 render
    let {
      render, data, props: propsOption, setup,
      beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
    } = componentOptions

    // 调用 beforeCrate 钩子
    beforeCreate && beforeCreate()

    // 调用 data 函数得到原始数据
    const state = reactive(data ? data() : {})
    // 调用 resolveProps 函数解析出最终的 props 数据与 attrs 数据
    const [props, attrs] = resolveProps(propsOption, vnode.props)

    // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
    const instance = {
      // 组件自身的状态数据，即 data
      state,
      // 将解析出的 props 数据包装为 shallowReative 并定义到组件实例上
      props: shallowReactive(props),
      // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
      isMounted: false,
      // 组件所渲染的内容，即子树（subTree）
      subTree: null
    }

    // 定义 emit 函数，它接收两个参数
    // event：事件名称
    // payload：传递给事件处理函数的参数
    function emit(event, ...payload) {
      // 根据约定对事件名称进行处理
      const eventName = `on${ event[0].toUpperCase() + event.slice(1) }`
      // 根据处理后的事件名称去 props 中寻找对应的事件处理函数
      const handler = instance.props[eventName]
      
      if (handler) {
        // 调用事件处理函数并传递参数
        handler(...payload)
      } else {
        console.error('事件不存在')
      }
    }

    // setupContext
    const setupContext = { attrs, emit }
    
    // 调用 setup 函数，将只读版本的 props 作为第一个参数传递，避免用户意外地修改 props 的值
    // 将 setupContext 作为第二个参数传递
    const setupResult = setup(shallowReadonly(instance.props), setupContext)
    // setupState 用来存储由 setup 返回的数据
    let setupState = null
    // 如果 setup 函数的返回值是函数，则将其作为渲染函数
    if (typeof setupResult === 'function') {
      if (render) console.error('setup 函数返回渲染函数，render 选项将被忽略')
      // 将 setupResult 作为渲染函数
      render = setupResult
    } else {
      // 如果 setup 的返回值不是函数，则作为数据状态赋值给 setupState
      setupState = setupResult
    }

    // 将组件实例设置到 vnode 上，用于后续更新
    vnode.component = instance

    // 创建渲染上下文对象，本质上是组件实例的代理
    const renderContext = new Proxy(instance, {
      get(t, k, r) {
        // 取得组件自身状态与 props 数据
        const { state, props } = t
        if (state && k in state) {
          // 尝试读取自身状态数据
          return state[k]
        } else if (k in props) {
          // 如果组件自身没有数据，尝试从 props 中读取
          return props[k]
        } else if (setupState && k in setupState) {
          // 渲染上下文需要增加对 setupState 的支持
          return setupState[k]
        } else {
          console.error('不存在')
        }
      },
      set(t, k, v, r) {
        const { state, props } = t
        if (state && k in state) {
          state[k] = v
        } else if (k in props) {
          props[k] = v
        } else if (setupState && k in setupState) {
          setupState[k] = v
        } else {
          console.error('不存在')
        }
      }
    })

    // 调用 created 钩子
    created && created.call(renderContext)
    
    // 将组件的 render 函数包装到 effect 内
    effect(() => {
      const subTree = render.call(renderContext, renderContext)

      // 检查组件是否已经被挂载
      if (!instance.isMounted) {
        // 调用 beforeMount 钩子
        beforeMount && beforeCreate.call(renderContext)

        // 初次挂载，调用 patch 函数第一个参数传递 null
        patch(null, subTree, container, anchor)
        // 将组件示例的 isMounted 属性设置为 true
        instance.isMounted = true

        // 调用 mounted 钩子
        mounted && mounted.call(renderContext)
      } else {
        // 调用 beforeUpdate 钩子
        beforeUpdate && beforeUpdate.call(renderContext)

        // 当 isMounted 为 true 时，说明组件已经被挂载，只需要完成自更新即可
        // 所以在调用 patch 函数时，第一个参数为组件上一次渲染的子树
        // 使用新的子树与上一次渲染的子树进行打补丁操作
        patch(instance.subTree, subTree, container, anchor)

        // 调用 updated 钩子
        updated && updated.call(renderContext)
      }

      // 更新组件实例的子树
      instance.subTree = subTree
    }, {
      // 指定该副作用函数的调度器为 queueJob 即可
      scheduler: queueJob
    })
  }

  function patchComponent(n1, n2, anchor) {
    // 获取组件实例，即 n1.component，同时让新的组件虚拟节点 n2.component 也指向组件实例
    const instance = (n2.component = n1.component)
    // 获取当前的 props 数据
    const { props } = instance

    // 调用 hasPropsChanged 检测子组件传递的 props 是否发生变化，如果没有变化，则不需要更新
    if (hasPropsChanged(n1.props, n2.props)) {
      // 调用 resolveProps 函数重新获取 props 数据
      const [nextProps] = resolveProps(n2.type.props, n2.props)
      // 更新 props
      for (const k in nextProps) {
        props[k] = nextProps[k]
      }
      // 删除不存在的 props
      for (const k in props) {
        if (!(k in nextProps)) delete props[k]
      }

      // TODO：update 逻辑
    }
  }

  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        unmount(container._vnode)
      }
    }
    container._vnode = vnode
  }

  function hydrate (vnode, container) {}
  
  return {
    render,
    hydrate
  }
}


// 解析组件 props 和 attrs 数据
function resolveProps(options = {}, propsData) {
  const props = {}
  const attrs = {}

  // 遍历组件传递的 props 数据
  for (const key in propsData) {
    if (key in options || key.startsWith('on')) {
      // 如果为组件传递的 props 数据在组件自身的 props 选项中有定义，
      // 则视为合法的 props
      props[key] = propsData[key]
    } else {
      // 否则将其视为 atts
      attrs[key] = propsData[key]
    }
  }

  // 最后返回 props 和 attrs 数据
  return [props, attrs]
}

function hasPropsChanged(prevProps, nextProps) {
  const nextKeys = Object.keys(nextProps)
  // 如果新旧 props 的数量变了，说明有变化
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i]
    // 有不相等的 props，则说明有变化
    if (nextProps[key] !== prevProps[key]) return true
  }
  return false
}

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
