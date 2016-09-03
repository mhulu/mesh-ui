import Vue from 'vue'
import VueResource from 'vue-resource'
import {API_ROOT} from '../config'
import {refreshToken} from '../vuex/auth/actions'
import {getCookie} from '../authService'
import NProgress from 'nprogress'
Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  NProgress.start()
  request.headers = request.headers || {}
  if (getCookie('token')) {
    request.headers['Authorization'] = 'Bearer ' + getCookie('token')
  }
  next((response) => {
    NProgress.done()
    if (response.status === 401) {
      refreshToken()
    }
  })
})

export const UserResource = Vue.resource(API_ROOT + 'user{/id}')
export const AuthResource = Vue.resource(API_ROOT + 'auth{/id}')
