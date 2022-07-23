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

  // 记录重试次数
  let retries = 0
  // 封装 load 函数用来加载异步组件
  function load() {
    return loader()
      // 捕获加载器的错误
      .catch((error) => {
        // 如果用户指定了 onError 回调，则将控制权交给用户
        if (options.onError) {
          // 返回一个新的 Promise 实例
          return new Promise((resolve, reject) => {
            // 重试
            const retry = () => {
              resolve(load())
              retries++
            }
            // 失败
            const fail = () => reject(err)
            // 作为 onError 回调函数的参数，让用户决定如何处理
            options.onError(retry, fail, retries)
          })
        } else {  
          throw error
        }
      })
  }

  // 返回一个包装组件
  return {
    async: 'AsyncComponentWrapper',
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false)
      // 定义 error，当错误发生时，用来存储错误对象
      const error = shallowRef(null)
      // 代表是否超时，默认为 false
      const timeout = ref(false)
      // 代表是否正在加载，默认为 false
      const loading = ref(false)
        
      let loadingTimer = null
      // 如果配置项中存在 delay，则开启一个定时器计时
      if (options.delay) {
        loadingTimer = setTimeout(() => {
          loading.value = true
        }, options.delay)
      } else {
        // 如果配置项中没有 delay，则直接标记为加载中
        loaded.value = true
      }

      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      // loader()
      //   .then(c => {
      //     InnerComp = c
      //     loaded.value = true
      //   })
      //   // 添加 catch 语句来捕获加载过程中的错误
      //   .catch(err => error.value = err)
      //   // 加载完毕后，无论成功与否都要清除延迟定时器
      //   .finally(() => {
      //     loaded.value = false
      //     clearTimeout(loadingTimer)
      //   })
      // 调用 load 函数加载组件
      load()
        .then(c => {
          InnerComp = c
          loaded.value = true
        })
        // 添加 catch 语句来捕获加载过程中的错误
        .catch(err => error.value = err)
        // 加载完毕后，无论成功与否都要清除延迟定时器
        .finally(() => {
          loaded.value = false
          clearTimeout(loadingTimer)
        })

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
        } else if (loaded.value && options.loadingComponent) {
          // 如果异步组件正在加载，并且用户指定了 Loading 组件，则渲染 Loading 组件
          return { type: options.loadingComponent }
        }
        // 渲染一个占位内容
        return { type: Text, children: '' }
      }      
    }
  }
}

// --------------------------------

function fetch() {
  return new Promise((resolve, reject) => {
    // 请求会在 1 秒后失败
    setTimeout(() => {
      reject('err')
    }, 1000)
  })
}

// load 函数接收一个 onError 函数
function load(onError) {
  // 请求接口，得到 Promise 实例
  const p = fetch()
  // 捕获错误
  return p.catch(err => {
    // 当错误发生时，返回一个新的 Promise 实例，并调用 onError 回调
    // 同时将 retry 函数作为 onError 回调的参数
    return new Promise((reoslve, reject) => {
      // retry 函数，用来执行重试的函数，执行该函数会重新调用 load 函数并发送请求
      const retry = () => resolve(load(onError))
      const fail = () => reject(err)
      onError(retry, fail)
    })
  })
}


// 调用 load 函数加载资源
load(
  // onError 回调
  (retry) => {
    // 失败后重试
    retry()
  }
).then(res => {
  // 成功
  console.log(res)
})


