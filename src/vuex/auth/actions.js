import api from '../../api'
import {saveCookie, signOut} from '../../authService'
import * as types from '../mutation-types'
import swal from 'sweetalert'
import VueRouter from 'vue-router'
import {showMsg} from '../msg/actions'
/**
 * 本地登录
 * @param  {[type]} store       [description]
 * @param  {[type]} credentials [description]
 * @return {[type]}             [description]
 */
export const localLogin = (store, credentials) => {
  api.localLogin(credentials).then(response => {
    const token = response.data.result.token
    const id = response.data.result.id
    saveCookie('token', token)
    store.dispatch(types.LOGIN_SUCCESS, {token: token})
    store.router.go('/')
  }, response => {
    swal({
      title: '登录失败',
      text: '您输入的信息有误,请重新输入',
      type: 'error',
      confirmButtonText: '重新输入'
    })
  })
}

export const getAuthUserInfo = (store, id) => {
  api.getUser(id).then(response => {
    var data = response.data
    window.localStorage.setItem('userInfo', JSON.stringify(data))
    store.dispatch(types.GET_AUTH_USER_INFO, {userInfo: data})
  })
}

// 调用API POST更新数据
export const updateAuthUserInfo = (store, id, data) => {
  api.updateUser(id, data).then(response => {
    // 更新成功，重新调用getAuthUserInfo方法，更新state
    getAuthUserInfo(store, 'me')
    // store.js 中会将缓存中的最新值写入
    store.dispatch(types.UPDATE_USER_INFO)
    showMsg(store, '个人资料已成功更新', 'info')
  }, response => {
    swal({
      title: '操作失败',
      text: '个人资料更新失败，可能由于您长时间未操作或网络不畅通造成，建议您再试一次',
      type: 'error',
      confirmButtonText: '再试一次'
    })
  })
}

export const logout = ({dispatch, router}) => {
    dispatch(types.LOGOUT)
    signOut()
    window.location.reload()
  }
  export const refreshToken = (store) => {
    api.refreshToken().then(response => {
      const token = response.data.result
      saveCookie('token', token)
    }, response => {
      signOut()
      swal({
        title: '出现错误',
        text: '系统自动刷新令牌未能成功，请重新登录',
        type: 'error',
        time: 1000
      }, function () {
        window.location = '/'
      })
    })
  }