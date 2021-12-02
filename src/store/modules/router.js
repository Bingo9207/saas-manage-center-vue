import router from '../../router';

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
  // 更新侧边栏key
  updateSideKeys(state, payload) {
    state.sideKeys = payload;
  },
  // 更新Tabkey
  updateTabKeys(state, payload) {
    state.tabKeys = payload;
  },
  // 更新TabList
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
  deleteTabItem(state, payload) {
    const tempArray = state.tabList.concat([]);
    const index = tempArray.findIndex(item => item.path === payload);
    let path = state.tabKeys;
    if (state.tabKeys === payload) {
      if (index === tempArray.length - 1) {
        path = tempArray[index - 1].path;
      } else {
        path = tempArray[index + 1].path;
      }
    }
    tempArray.splice(index, 1);
    state.tabKeys = path;
    state.tabList = tempArray;
    sessionStorage.setItem("tabList", JSON.stringify(tempArray))
    router.push(path)
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