class HistoryRoute {
  constructor () {
    this.current = null;
  }
}

class VueRouter {
  constructor (options) {
    this.mode = options.mode || 'hash';
    this.routes = options.routes || [];
    this.routesMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    this.init();
  }

  /**
   * @description 初始化方法
   * @return {void}
   */
  init () {
    switch (this.mode) {
      case 'hash':
        location.hash ? '' : location.hash = '/';
        window.addEventListener('load', () => {
          this.history.current = location.hash.slice(1);
        });
        window.addEventListener('hashchange', () => {
          this.history.current = location.hash.slice(1);
        });
        break;
      case 'history':
        location.pathname ? '' : location.pathname = '/';
        window.addEventListener('load', () => {
          this.history.current = location.pathname;
        });
        window.addEventListener('popstate', () => {
          this.history.current  = location.pathname;
        });
        break;
      default:
        break;
    }
  }

  /**
   * @description 创建路由表
   * @param {array} routes 
   * @return {object}
   */
  createMap (routes) {
    return routes.reduce((prevVal, currentVal) => {
      const { path, component } = currentVal;
      prevVal[path] = component;
      return prevVal;
    }, {});
  }
}

VueRouter.install = function (Vue, options) {
  Vue.mixin({
    beforeCreate () {
      // 根实例
      if (this.$options && this.$options.router) {
        this._root = this;
        this._router = this.$options.router;
        Vue.util.defineReactive(this, '_route', this._router.history);
      } else {
        this._root = this.$parent._root;
      }
      // 混入$route、$router
      Object.defineProperty(this, '$route', {
        get () {
          return {
            current: this._root._router.history.current
          };
        }
      });
      Object.defineProperty(this, '$router', {
        get () {
          return this._root._router;
        }
      });
    },
  });
  // 注册router-link、router-view全局组件
  Vue.component('router-link', {
    props: {
      to: String,
      required: true
    },
    render (h) {
      const mode = this._self._root._router.mode;

      return <a href={ mode === 'hash' ? `#${this.to}` : this.to }>
        { this.$slots.default }
      </a>;
    }
  });
  Vue.component('router-view', {
    render (h) {
      const router = this._self._root._router;

      const current = router.history.current,
            routesMap = router.routesMap;

      return h(routesMap[current]);
    }
  });
}

export default VueRouter;