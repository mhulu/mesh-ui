import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import registerRouters from './routers'
import App from './pages/App.vue'
import { sync } from 'vuex-router-sync'
import VueValidator from 'vue-validator'
import { fromNow } from './filters'
import store from './vuex/store'

import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css'
import 'sweetalert/dist/sweetalert.css'
import './sass/app.scss'

Vue.use(VueValidator)
Vue.validator('mobile', function (val) {
  return /(^(13\d|14[57]|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/.test(val)
})
Vue.validator('qq', function (val) {
  return /^[1-9]\d{4,9}$/.test(val)
})
Vue.validator('email', function (val) {
  return /\S+@\S+\.\S+/.test(val)
})
Vue.validator('identify', function (val) {
  return /^\d{6}(((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}([0-9]|x|X))|(\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}))$/.test(val)
})
Vue.validator('chinese', function (val) {
  return /^[\u4e00-\u9fa5]+$/.test(val)
})
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.filter('fromNow', fromNow)
const router = new VueRouter({
  hashbang: false
})

sync(store, router)
registerRouters(router)
router.start(App, '#app')
