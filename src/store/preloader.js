import Vuex from 'vuex'

// STATE

const state = {
  progress: 0,
  isHidden: false
}

// ACTIONS

const actions = {
  progressUpdate: 'PROGRESS_UPDATE',
  hide: 'HIDE'
}

// MUTATIONS

const mutations = {
  PROGRESS_UPDATE (state, pourcent) {
    state.progress = pourcent
  },

  HIDE (state) {
    state.isHidden = true
  }
}

// ----

export default new Vuex.Store({
  state,
  actions,
  mutations
})