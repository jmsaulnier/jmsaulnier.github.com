import Vuex from 'vuex'

// STATE

const state = {
  isOpen: false
}

// ACTIONS

const actions = {
  open: 'OPEN',
  close: 'CLOSE'
}

// MUTATIONS

const mutations = {
  OPEN (state) {
    state.isOpen = true
  },

  CLOSE (state) {
    state.isOpen = false
  }
}

// ------------

export default new Vuex.Store({
  state,
  actions,
  mutations
})
