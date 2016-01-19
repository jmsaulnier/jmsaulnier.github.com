import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

const state = {
  project: '',
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})