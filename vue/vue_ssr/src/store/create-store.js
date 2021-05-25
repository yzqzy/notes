import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default () => {
  let store = new Vuex.Store({
    state: () => {
      return {
        value: 'old value'
      }
    },
    mutations: {
      changeValue (state, payload) {
        state.value = payload;
      }
    },
    actions: {
      changeValue ({ commit }, payload) {
        return new Promise((resolve, rejejct) => {
          setTimeout(() => {
            commit('changeValue', payload); 
            resolve();
          }, 3000);
        });
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }

  return store;
}