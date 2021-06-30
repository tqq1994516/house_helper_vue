import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    type: "default",
  },
  mutations: {
    getType(state, newValue) {
      state.type = newValue;
    },
  },
  actions: {
    setType(context, value) {
      context.commit("getType", value);
    },
  },
  modules: {},
  //配置vuex-persistedstate
  plugins: [
    createPersistedState(
      //配置将vuex的状态储存到sessionStorage中（默认储存到localStorage中）
      { storage: window.sessionStorage }
    ),
  ],
});
