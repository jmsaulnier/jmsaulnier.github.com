import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

const state = {
  progress: 0,
  isHidden: false
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})