// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
function defineAsyncComponent(options) {
  // options 既可以是配置项，也可以是加载器
  if (typeof options === 'function') {
    // 如果是 options 是加载器，将其格式化配置项形式
    options = {
      loader: options
    }
  }

  const { loader } = options

  // 一个变量，用来存储异步加载的组件
  let InnerComp = null

  // 返回一个包装组件
  return {
    async: 'AsyncComponentWrapper',
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false)
      // 代表是否超时，默认为 false
      const timeout = ref(false)
      // 定义 error，当错误发生时，用来存储错误对象
      const error = shallowRef(null)

      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      loader()
        .then(c => {
          InnerComp = c
          loaded.value = true
        })
        // 添加 catch 语句来捕获加载过程中的错误
        .catch(err => error.value = err)

      let timer = null
      if (options.timeout) {
        // 如果指定超时时长，开启一个定时器
        timer = setTimeout(() => {
          // 超时后创建一个错误对象，并赋值给 error.value
          const err = new Error(`Async component timed out after ${ options.timeout }ms.`)
          err.value = err
          // 超时后将 timeout 设置为 true
          timeout.value = true
        }, options.timeout)
      }
      // 包装组件被卸载时清除定时器
      onUnmounted(() => clearTimeout(timer))

      // 占位内容
      const placeholder = { type: Text, children: '' }

      return () => {
        if (loaded.value) {
          // 如果异步组件加载成功，渲染该组件
          return { type: InnerComp }
        } else if (timeout.value && options.errorComponent) {
          // 如果加载超时，并且用户指定 Error 组件，则渲染该组件
          // 同时将 error 作为 props 传递
          return { type: options.errorComponent, props: { error: error.value } }
        }
        // 渲染一个占位内容
        return { type: Text, children: '' }
      }      
    }
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('CompA.vue'),
  // 延迟 200 ms 展示 Loading 组件
  delay: 200,
  // Loading 组件
  loadingComponent: [
    setup() {
      return () => {
        return { type: 'h2', children: 'Loading...' }
      }
    }
  ]
})