import Vue from 'vue'
import Vuex from 'vuex'
import { authModule } from './auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authModule
  },
  getters:{

  }
})
