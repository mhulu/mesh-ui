<template>
  <vue-toast v-ref:toast></vue-toast>
</template>

<script>
import vueToast from 'vue-toast'
import { showMsg, hideMsg } from '../vuex/msg/actions'

export default {
  components: { vueToast },
  vuex: {
    getters: {
      msg: ({msg}) => msg.message
    },
    actions: {
      showMsg, hideMsg
    }
  },
  watch: {
    'msg': {
      handler: function (val, oldVal) {
        if (val.content !== '') {
          this.showToastr(val.content, val.type)
          this.hideMsg()
        }
      },
      deep: true
    }
  },
  methods: {
    showToastr(content,type='success', position='top right'){
      this.$refs.toast.setOptions({ maxToasts:3, position: position })
      this.$refs.toast.showToast(content, {
        theme: type,
        timeLife: 3800,
        closeBtn: false
      })
    }
  }
}
</script>
<style>
  .vue-toast-manager_container {
  width: 100%;
}

.vue-toast-manager_container.\--top {
  top: 10px;
}

.vue-toast-manager_container.\--bottom {
  bottom: 10px;
}

.vue-toast-manager_container.\--left {
  left: 10px;
}

.vue-toast-manager_container.\--right {
  right: 10px;
}

.vue-toast-manager_toasts {
  position: relative;
}
.vue-toast_container {
    color: #FFF;
    cursor: default;
    display: none;
    font-size: 1.3em;
    left: 0;
    opacity: 1;
    position: fixed;
    right: 0;
    text-align: center;
    z-index: 2000;
    display: block;
}

.vue-toast_container._default .vue-toast_message {
  background-color: rgba(0,0,0, .9);

}


.vue-toast_container._info .vue-toast_message {
  background-color: rgba(49,112,143, .9);

}


.vue-toast_container._success .vue-toast_message {
  background-color: rgba(60,118,61, .9);

}


.vue-toast_container._warning .vue-toast_message {
  background-color: rgba(138,109,59, .9);

}


.vue-toast_container._error .vue-toast_message {
  background-color: rgba(169,68,66, .9);

}


.vue-toast-manager_container.\--top .vue-toast_container {
  top: 0;

}


.vue-toast-manager_container.\--bottom .vue-toast_container {
  bottom: 0;

}


.vue-toast-manager_container.\--left .vue-toast_container {
  left: 0;

}


.vue-toast-manager_container.\--right .vue-toast_container {
  right: 0;

}

.vue-toast_container.v-enter,
.vue-toast_container.v-leave {
  opacity: 0;
}

.vue-toast_message {
  padding: 15px 22px 15px 10px;
  color: white;
  font-family: arial, sans-serif;
}

.vue-toast_close-btn {
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 14px;
  height: 14px;
  opacity: .7;
  -webkit-transition: opacity .15s ease-in-out;
  transition: opacity .15s ease-in-out;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}

.vue-toast_close-btn:hover {
  opacity: .9;

}

.vue-toast_close-btn::before,
  .vue-toast_close-btn::after {
  content: '';
  position: absolute;
  top: 6px;
  width: 14px;
  height: 2px;
  background-color: white;

}

.vue-toast_close-btn::before {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);

}

.vue-toast_close-btn::after {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);

}

</style>