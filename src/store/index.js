import { createStore } from 'vuex'
import router from './modules/router'

export default createStore({
  modules: {
    router
  }
})