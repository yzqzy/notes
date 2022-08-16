let _Vue = null

export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true

    // 2. 缓存 Vue 构造函数
    _Vue = Vue

    // 3. router 对象注入到 Vue 实例上
    _Vue.mixin({
      beforeCreate() {
        // 根实例才混入 $router 
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.bindEvent()
  }

  createRouteMap() {
    // 将所有路由规则解析成键值对形式，存储到 routeMap 中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,            
          },
          on: {
            click: this.clickHandler
          }
        }, [ this.$slots.default ])
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })

    const _self = this
    Vue.component('router-view', {
      render(h) {
        const component = _self.routerMap[_self.data.current]
        return h(component)
      }
    })
  }

  bindEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}

