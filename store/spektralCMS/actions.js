export default {
  ACT_EDIT_MODE({
    commit
  }, mode) {
    commit('SET_EDIT_MODE', mode);
  }
}