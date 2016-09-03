<template>
  <div id="box" class="app-sidebar-fixed app-navbar-fixed ">
    <Toaster></Toaster>
      <sidebar></sidebar>
      <div class="app-content">
        <!-- top navbar -->
        <top-navbar></top-navbar>
        <!-- / top navbar -->
        <!-- main content -->
        <div  class="main-content">
          <div class="wrap-content container">
           <breadcrumb></breadcrumb>
            <router-view
             keep-alive
             transition="fade"
             transition-mode="out-in"
             >
             </router-view>
          </div>
        </div>
        <!-- / main content -->
      </div>
      <!-- <chatbox api="http://demo1429768.mockable.io/messages"></chatbox> -->
  </div>
</template>

<script>
  import sidebar from '../components/Sidebar.vue'
  import topNavbar from '../components/TopNavbar.vue'
  // import chatbox from '../components/Chatbox.vue'
  import Breadcrumb from '../components/Breadcrumb.vue'
  import toaster from '../components/Toaster.vue'
  import {getAuthUserInfo} from '../vuex/auth/actions'
  export default {
    // replace: false,
    components: {
      sidebar, toaster, topNavbar, Breadcrumb
      // toaster, sidebar, topNavbar, chatbox, Breadcrumb
    },
    created () {
      this.getAuthUserInfo('me')
    },
    vuex: {
      actions: {
        getAuthUserInfo
      }
    }
  }
</script>

