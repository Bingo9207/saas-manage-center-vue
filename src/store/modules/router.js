const state = () => ({
  sideKeys: "",

  tabKeys: "",
  tabList: []
})

// getters
const getters = {

}

// actions
const actions = {}

// mutations
const mutations = {
  updateSideKeys(state, payload) {
    state.sideKeys = payload;
  },
  updateTabKeys(state, payload) {
    state.tabKeys = payload;
  },
  updateTabList(state, payload) {
    const index = state.tabList.findIndex(item => item.path === payload.path);
    if (index < 0) {
      state.tabList.push({
        path: payload.path,
        name: payload.name
      })
      sessionStorage.setItem("tabList", JSON.stringify(state.tabList))
    }
  },
  assignmentTabList(state, payload) {
    state.tabList = payload
  },
  logout(state) {
    sessionStorage.clear();
    state.sideKeys = "";
    state.tabKeys = "";
    state.tabList = [];
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}