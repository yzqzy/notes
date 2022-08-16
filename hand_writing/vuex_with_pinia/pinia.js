import { reactive, inject } from 'vue'

export function createPinia () {
  return {
    install(app) {
      const store = reactive({})

      app.provide('setSubState', (storeName, subStore) => {
        store[storeName] = subStore
        
        const $patch = (options) => {
          for (const key in options) {
            store[storeName][key] = options[key]
          }
        }

        store[storeName].$patch = $patch
      })

      app.provide('piniaStore', store)
    }
  }
}

export function defineStore(storeName, options) {
  const store = reactive({})
  const state = options.state()
  const actions = options.actions

  for (const key in state) {
    store[key] = state[key]
  }
  for (const action in actions) {
    store[method] = actions[method]
  }

  return function() {
    const piniaStore = inject('piniaStore')

    if (!piniaStore[storeName]) {
      const setSubState = inject('setSubState')
      setSubState(storeName, store)
    }

    return piniaStore(storeName)
  }
}
