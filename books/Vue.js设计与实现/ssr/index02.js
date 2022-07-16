const { renderElementVNode } = require('./index01')

console.log('-----------------')

const MyComponent = {
  setup() {
    return () => {
      // 该组件渲染一个 div 标签
      return {
        type: 'div',
        children: 'hello'
      }
    }
  }
}

// 用来描述组件的 VNode 对象
const CompVNode = {
  type: MyComponent
}

function renderComponentVNode(vnode) {
  // 获取 setup 组件选项
  let { type: { setup } } = vnode
  // 执行 setup 函数得到渲染函数 render
  const render = setup()
  // 执行渲染函数得到 subTree，即组件要渲染的内容
  const subTree = render()
  // 调用 renderVNode 完成渲染，并返回结果
  return renderVNode(subTree)
}

// function renderComponentVNode(vnode) {
//   const isFUnctional = typeof vnode.type === 'function'
//   let componentOptions = vnode.type

//   if (isFUnctional) {
//     componentOptions = {
//       render: vnode.type,
//       props: vnode.type.props
//     }
//   }

//   let { render, data, setup, beforeCreate, created, props: propsOption } = componentOptions

//   beforeCreate && beforeCreate()

//   // 无须使用 reactive() 创建 data 的响应式版本
//   const state = data ? data() : null
//   const [props, attrs] = resolveProps(propsOption, vnode.props)

//   const slots = vnode.children || {}

//   const instance = {
//     state,
//     props, // props 无须 shallowReactive
//     isMounted: false,
//     subTree: null,
//     slots,
//     mounted: [],
//     keepAliveCtx: null
//   }

//   function emit(event, ...payload) {
//     const eventName = `on${ event[0].toUpperCase() + event.slice(1) }`
//     const handler = instance.props[eventName]
//     if (handler) {
//       handler(...payload)
//     } else {
//       console.error('事件不存在')
//     }
//   }

//   // setup
//   let setupState = null
//   if (setup) {
//     const setupContext = { attrs, emit, slots }
//     const prevInstance = setCurrentInstance(instance)
//     const setupResult = setup(shallowReadonly(instance.props), setupContext)
//     setCurrentInstance(prevInstance)
//     if (typeof setupResult === 'function') {
//       if (render) console.error('setup 函数返回渲染函数，render 选项被忽略')
//     } else {
//       setupState = setupContext
//     }
//   }

//   vnode.component = instance

//   const renderContext = new Proxy(instance, {
//     get (t, k, r) {
//       const { state, props, slots } = t

//       if (k === '$slots') return slots

//       if (state && k in state) {
//         return state[k]
//       } else if (k in props) {
//         return props[k]
//       } else if (setupState && k in setupState) {
//         return setupState[k]
//       } else {
//         console.error('不存在')
//       }
//     },
//     set(t, k, v, r) {
//       const { state, props } = t
//       if (state && k in state) {
//         return state[k]
//       } else if (k in props) {
//         return props[k]
//       } else if (setupState && k in setupState) {
//         return setupState[k]
//       } else {
//         console.error('不存在')
//       }
//     }
//   })

//   created && created.call(renderContext)

//   const subTree = render.call(renderContext, renderContext)

//   return renderVNode(subTree)
// }

function renderVNode(vnode) {
  const type = typeof vnode.type

  if (type === 'string') {
    return renderElementVNode(vnode)
  } else if (type === 'object' || type === 'function') {
    return renderComponentVNode(vnode)
  } else if (vnode.type === Text) {
    // 处理文本
  } else if (vnode.type === Fragment) {
    // 处理片段
  } else {
    // 其他 VNode 类型
  }
}

const html = renderComponentVNode(CompVNode)
console.log(html) // <div>hello</div>
