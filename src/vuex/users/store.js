import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  userInfo:[]
}

// mutations
const mutations = {
  [types.RECEIVE_USERS] (state, users) {
    state.all = users
  },
  [types.FIND_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  state,
  mutations
}
