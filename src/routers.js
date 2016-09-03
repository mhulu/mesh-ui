import {getCookie} from './authService'

import Login from './pages/Login'
import Overlay from './components/Overlay'
import Me from './pages/Me'
import Security from './pages/Security'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

export default function (router) {
  router.map({
    // Overlay pages
    '/auth': {
      component: Overlay,
      auth: false,
      subRoutes: {
        '/': {
          component: Login
        }
      }
    },
    // Dashboard
    '/': {
      component: Dashboard,
      subRoutes: {
        // HOME
        '/': {
          component: Home
        },
        '/profile/me': {
          name: 'me',
          component: Me
        },
        '/profile/security': {
          component: Security
        }
      }
    },
    '*': {
      component: NotFound
    }
  })

  // 访问Dashboard及其子组件需要登录
  router.beforeEach(function (transition) {
    // 如果当前页面是非auth且没有token和userInfo(即直接访问需要验证的页面),则跳转到登陆页面
    if (transition.to.auth !== false && getCookie('token') === undefined) {
      transition.redirect('/auth')
    // 如果当前页面是auth并且有token(即登陆了之后又直接访问登陆页面),则忽略
    } else if (transition.to.auth === false && getCookie('token') !== undefined) {
      transition.abort()
    } else {
      transition.next()
    }
  })
}
