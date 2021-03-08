import Vue from 'vue'
import Vuex from "vuex"
import state from "./state.js"
import actions from "./actions.js"
import mutations from "./mutations.js"
Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
	state,//state为公用数据
	actions,
	mutations,
  plugins: [createPersistedState()]
})
