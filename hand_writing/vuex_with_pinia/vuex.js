import { reactive, inject } from 'vue'

class Store {
  constructor (state, mutations, actions) {
    this.state = state
    this.mutations = mutations
    this.actions = actions
  }

  install (app) {
    const store = {}

    store.state = reactive(this.state)

    store.commit = (mutationName, payload) => {
      this.mutations[mutationName](store.state, payload)
    }

    store.dispatch = (actionName, payload) => {
      this.actions[actionName]({
        commit: store.commit,
        state: store.state
      }, payload)
    }

    app.provide('store', store)
  }
}

export function createStore({
  state,
  mutations,
  actions
}) {
  return new Store(state, mutations, actions)
}

export function useStore () {
  const store = inject('store')
  return store
}
