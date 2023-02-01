import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false
  },
  getters: {
  },
  mutations: {
    doLogin(state){
      state.isLogin = true
    },
    doLogout(state){
      state.isLogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
