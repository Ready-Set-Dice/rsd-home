import Vue from 'vue'
import Vuex from 'vuex'
import createPersistentState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkmode: false,
    page: null,
  },
  getters: {
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkmode = !state.darkmode
    },
    setPage(state, data) {
      state.page = data
    },
  },
  actions: {
    toggleDarkMode ({ commit }) {
      commit('toggleDarkMode')
    },
    setPage({ commit }, data) {
      commit('setPage', data)
    },
  },
  modules: {
  },
  plugins: [createPersistentState()]
})
