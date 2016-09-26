import * as types from '../mutation-types'
import { getCookie } from '../../authService'
// initial state
const state = {
  token: getCookie('token') || null,
  currentUserInfo: JSON.parse(window.localStorage.getItem('userInfo')) || null
}

// mutations
const mutations = {
  [types.LOGIN_SUCCESS] (state, action) {
    state.token = action.token
  },
  [types.LOGOUT] (state, action) {
    state.currentUserInfo = null
    state.token = null
  },
  [types.REFRESH_TOKEN_SUCCESS] (state, action) {
    state.token = action.token
  },
  [types.GET_AUTH_USER_INFO] (state, action) {
    state.currentUserInfo = action.userInfo
  },
  [types.UPDATE_USER_INFO] (state) {
    state.currentUserInfo = window.localStorage.getItem('userInfo')
  }
}

export default {
  state,
  mutations
}
