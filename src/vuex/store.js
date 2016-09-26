import Vue from 'vue'
import Vuex from 'vuex'
import fullscreen from './fullscreen/store'
import auth from './auth/store'
import users from './users/store'
import msg from './msg/store'
import createLogger from 'vuex/logger'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
   users, auth, msg, fullscreen
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
