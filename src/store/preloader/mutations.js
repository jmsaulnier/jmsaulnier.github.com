export default {

  PROGRESS_UPDATE (state, pourcent) {
    state.progress = pourcent
  },

  HIDE (state) {
    state.isHidden = true
  }
}