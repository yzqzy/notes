import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    number: 10
  },
  getters: {
    myNumber: function (state) {
      return state.number + 5;
    }
  },
  mutations: {
    syncAdd: function (state, payload) {
      console.log('root module sync add');
      state.number += payload;
    }
  },
  actions: {
    asyncAdd ({ commit }, payload) {
      setTimeout(() => {
        commit('syncAdd', payload);
      }, 1000);
    }
  },
  modules: {
    a: {
      state: { x: 1 },
      mutations: {
        syncAdd () {
          console.log('a module sync add');
        }
      },
      modules: {
        c: {
          state: { z: 3 }
        }
      }
    },
    b: {
      state: { y: 2 }
    }
  }
})
