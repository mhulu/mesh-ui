<template>
  <div class="breadcrumb-wrapper" v-if="currentRoute">
    <h4 class="mainTitle no-margin"><i class="fa"v-bind:class="'fa-' + currentRoute.icon"></i> {{currentRoute.name}}</h4>
    <small>{{currentRoute.description}}</small>
  </div>
</template>

<script>
/**
 * 面包屑导航强制要求
 * 数据库中的url格式开头必须有'/'
 */
    import * as utils from 'underscore'
    export default {
      vuex: {
        getters: {
          currentPath: state => state.route.path,
          menuList: state => state.auth.currentUserInfo.menuList
        }
      },
      computed: {
        currentRoute () {
          var currentPath = this.currentPath
          // 首页
          if (currentPath === '/') {
            return {'icon': 'dashboard', 'name': '控制面板', 'description': '管理控制中心'}
          } else if (currentPath === '/profile/me'){
            return {'icon': 'user', 'name': '个人信息', 'description': '管理自己的资料信息'}
          } else {
            var collect = utils.where(this.menuList, {url: '/' + currentPath.split('/')[1]})
            // 如果发现submenu键
            if (utils.property(collect, 'submenu')) {
              return utils.first(utils.toArray(utils.where(collect[0].submenu, {url: currentPath})))
            } else {
              // 没有submenu则
              return utils.first(utils.toArray(collect))
            }
          }
        }
      }
    }
</script>