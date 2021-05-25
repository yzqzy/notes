import applyMixin from './mixin';

let _Vue;

let forEach = (obj, callback) => {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key]);
  });
}

class ModuleCollection {
  constructor (options) {
    // register module
    this.register([], options);
  } 

  register (path, rawModule) {
    let newModule = {
      _rawModule: rawModule,
      _children: {},
      state: rawModule.state
    };

    if (path.length == 0) {
      this.root = newModule;
    } else {
      let parent = path.slice(0, -1).reduce((prev, cur) => {
        return prev._children[cur];
      }, this.root);
      parent._children[path[path.length - 1]] = newModule;
    }

    // root vuex
    if (rawModule.modules) {
      forEach(rawModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module);
      })
    }
  }
}

/**
 * @description 安装模块
 * @param {*} store 
 * @param {*} rootState 
 * @param {*} path 
 * @param {*} module 
 */
function installModule (store, rootState, path, module) {
  if (path.length > 0) {
    let parent = path.slice(0, -1).reduce((prev, current) => {
      return prev[current];
    }, rootState);
    _Vue.set(parent, path[path.length - 1], module.state);
  }

  let getters = module._rawModule.getters;
  if (getters) {
    forEach(getters, (getterName, func) => {
      Object.defineProperty(store.getters, getterName, {
        get: () => func(module.state)
      });
    });
  }

  let mutations = module._rawModule.mutations;

  if (mutations) {
    forEach(mutations, (mutationName, func) => {
      let arr = store.mutations[mutationName] || (store.mutations[mutationName] = []);
      arr.push((payload) => func(module.state, payload));
    });
  }

  
  let actions = module._rawModule.actions;
  if (actions) {
    forEach(actions, (actionName, func) => {
      let arr = store.actions[actionName] || (store.actions[actionName] = []);
      arr.push((payload) => func(store, payload));
    });
  }

  forEach(module._children, (moduleName, module) => {
    installModule(store, rootState, path.concat(moduleName), module);
  });
}

export class Store {
  constructor (options) {
    this._vm = new _Vue({
      data: {
        state: options.state
      }
    });
    // init 
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    this.modules = {};

    // getters
    // let getters = options.getters || {};
    // forEach(getters, (getterName, func) => {
    //   Object.defineProperty(this.getters, getterName, {
    //     get: () => func(this.state)
    //   });
    // });

    // mutations
    // let mutations = options.mutations || {};
    // forEach(mutations, (mutationName, func) => {
    //   this.mutations[mutationName] = (payload) => {
    //     func.call(this, this.state, payload);
    //   }
    // });

    // actions
    // let actions = options.actions || {};
    // forEach(actions, (actionName, fn) => {
    //   this.actions[actionName] = (payload) => {
    //     fn.call(this, this, payload);
    //   }
    // });

    // modules
    this.modules = new ModuleCollection(options);
    installModule(this, this.state, [], this.modules.root);
    console.log(this);
    
    // change this 
    let { dispatch, commit } = this;
    this.dispatch = (...args) => dispatch.call(this, ...args);
    this.commit = (...args) => commit.call(this, ...args);
  }

  get state () {
    return this._vm.state;
  }

  dispatch (type, payload) {
    this.actions[type].forEach(func => func(payload));
  }

  commit (type, payload) {
    this.mutations[type].forEach(func => func(payload));
  }
}

export function install (Vue) {
  _Vue = Vue;
  applyMixin(Vue);
}