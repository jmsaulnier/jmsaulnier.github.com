import Vuex from 'vuex'

// STATE

const state = {
  project: '',
  isDetailsOpen: false
}

// ACTIONS

const actions = {
  update: 'UPDATE',
  openDetails: 'OPEN_DETAILS',
  closeDetails: 'CLOSE_DETAILS'
}

// MUTATIONS

const mutations = {
  UPDATE (state, project) {
    state.project = project
    state.isDetailsOpen = false
  },

  OPEN_DETAILS (state) {
    state.isDetailsOpen = true
  },

  CLOSE_DETAILS (state) {
    state.isDetailsOpen = false
  }
}

// ------------

export default new Vuex.Store({
  state,
  actions,
  mutations
})