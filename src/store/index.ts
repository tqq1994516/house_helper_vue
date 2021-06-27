import { createStore } from 'vuex'

export default createStore({
  state: {
    type: "default"
  },
  mutations: {
    getType(state, newValue) {
      state.type = newValue
    }
  },
  actions: {
    setType(context, value) {
      context.commit('getType', value)
    }
  },
  modules: {
  }
})
