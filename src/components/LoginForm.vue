<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-sm-6 col-xs-12 col-lg-6 col-md-offset-3 col-lg-offset-3 col-sm-offset-3 header padding-top-20 center  login">
        <logo></logo>
        <!-- TAB START -->
        <div class="login-tab row margin-top-20">
          <div class="col-sm-12">
            <div class="col-sm-6 tab" :class="{active: loginTab}" id="signIn" @click="loginTab=true">用户登陆</div>
            <div class="col-sm-6 tab" :class="{active: !loginTab}" id="signUp" @click="loginTab=false">注册新用户</div>         
          </div>
        </div>
        <!-- FORM START -->
        <div class="form">
          <form  v-show="loginTab" action="/" method="post" @submit.prevent="onSubmit">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-mobile" style="font-size: 20px;width:14px"></i></div>
                <input type="text" class="form-control" required placeholder=" 输入手机号" name="mobile" v-model="credentials.mobile" >
              </div>
            </div>
            <div class="form-group">
             <div class="input-group">
               <div class="input-group-addon"><i class="fa fa-key"></i></div>
               <input type="password" class="form-control" required placeholder=" 输入您的密码" name="password" v-model="credentials.password">
             </div>
           </div>
           <div class="row">
           <div class="checkbox clip-check check-primary col-sm-6">
            <input type="checkbox"  id="rememberMe" v-model="rememberMe">
            <label for="rememberMe" class="pull-left margin-left-15">
              两周内免登陆 <i class="fa" v-bind:class="{'fa-lock': !rememberMe, 'fa-unlock': rememberMe}"></i>
            </label>
          </div>
          <div class="col-sm-6">
            <a  v-link="'forget'" class="pull-right" style="height: 43px;line-height: 43px;">找回密码</a>
          </div>
          </div>
          <button  class="btn btn-light-blue btn-lg btn-block margin-bottom-10"><i class="fa fa-sign-in"></i> 点击登陆</button>
        </form>
        <!-- 注册用户 -->
        <validator name="loginForm">
        <form  v-show="!loginTab" class="form-horizontal">
         <div class="form-group">
          <label class="col-sm-3 control-label">手机号码 <i class="fa fa-check-circle text-success" v-if="$loginForm.phone.valid"></i><i class="fa fa-exclamation-circle text-danger" v-else></i></label>
          <div class="col-sm-9">
            <input type="text"  placeholder=" 输入手机号" name="newMobile" 
            v-validate:phone="{required:true, mobile:true}"
            v-model="credentials.newMobile" required class="form-control">
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">短信验证 <i class="fa fa-check-circle text-success" v-if="$loginForm.code.valid"></i><i class="fa fa-exclamation-circle text-danger" v-else></i></label>
          <div class="col-sm-5">
            <input type="text"  placeholder=" 输入您收到的短信验证码" name="authCode"
            v-validate:code="{ required:true, minlength:4, maxlength:6 }"
            v-model="credentials.authCode" required class="form-control">
          </div>
          <div class="col-sm-4">
            <count-down :disabled="$loginForm.phone.invalid" @click="getAuthCode"></count-down>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">输入密码 <i class="fa fa-check-circle text-success" v-if="$loginForm.password.valid"></i><i class="fa fa-exclamation-circle text-danger" v-else></i></label>
          <div class="col-sm-9">
             <input type="password"  class="form-control" placeholder=" 密码长度要大于6位少于10位" name="password" 
             v-validate:password="{ required:true, minlength:6, maxlength:10 }"
             v-model="credentials.newPassword" required>
          </div>
        </div>
                <div class="form-group">
          <label class="col-sm-3 control-label">密码确认 <i class="fa fa-check-circle text-success" v-if="$loginForm.repassword.valid"></i><i class="fa fa-exclamation-circle text-danger" v-else></i></label>
          <div class="col-sm-9">
             <input type="password"  class="form-control" placeholder=" 再次输入您的密码" 
             v-validate:repassword="['required','matchPsw']"
             v-model="credentials.newPassword_confirmation"  required>
          </div>
        </div>
        <button class="btn btn-light-blue btn-lg btn-block margin-bottom-10" @click.stop.prevent="signup" :disabled="$loginForm.invalid"><i class="fa fa-sign-in"></i> 注册</button>
     </form>
     </validator>
      </div>
          <alert
          :show.sync="showErr"
          :duration="3000"
          type="danger"
          dismissable>
          <p><i class="fa fa-warning"></i> {{error}}</p>
        </alert>
          <alert
          :show.sync="showInfo"
          :duration="3000"
          type="info"
          dismissable>
          <p><i class="fa fa-warning"></i> {{info}}</p>
        </alert>
    </div>
  </div>
</div>
</template>

<script>
import { alert } from 'vue-strap'
import {API_ROOT} from '../config'
import { localLogin } from '../vuex/auth/actions'
import swal from 'sweetalert'
// import * as utils from '../../utils'
// import * as validate from '../../validator'
import countDown from './CountDownBtn'
import logo from './Logo'
export default {
  replace: true,
  data () {
    return {
      credentials: {
        mobile: '',
        password: '',
        newMobile: '',
        newPassword: '',
        newPassword_confirmation: '',
        authCode: ''
      },
      rememberMe: false,
      showErr: false,
      showInfo: false,
      error: '',
      info: '',
      loginTab: true
    }
  },
  components: {
    alert,
    countDown,
    logo
  },
  vuex: {
    getters: {
      token: ({auth}) => auth.token
    },
    actions: {
      localLogin
    }
  },
  methods: {
    getAuthCode() {
      this.$http.post(API_ROOT + 'getsms', {mobile: this.credentials.newMobile}).then((response) => {
        swal ({
          title: '短信发送成功',
          text: response.data.result,
          type: 'success',
          confirmButtonText: '我知道了'
        })
      }, (response) => {
        swal({
          title: '短信发送失败',
          text: response.data.result,
          type: 'error',
          confirmButtonText: '我知道了'
        })
      })
    },
    signup () {
      this.$http.post(API_ROOT + 'signup', this.credentials).then((response) => {
        swal ({
          title: '注册成功',
          text: response.data.result,
          type: 'success',
          confirmButtonText: '我知道了',
          timer: 3500
        }, function () {
          window.location.reload()
        })
      }, (response) => {
        swal({
          title: '注册失败',
          text: response.data.result,
          type: 'error',
          confirmButtonText: '我知道了',
          timer: 3500
        })
      })
    },
    onSubmit () {
      var user = {
        mobile: this.credentials.mobile,
        password: this.credentials.password
      }
      this.localLogin(user)
    }
  },
  validators: {
    matchPsw: function (val) {
      return val === this.vm.credentials.newPassword
    }
  }
}
</script>
<style>
  .text-success {
    color: #4aab8e !important;
  }
  .text-danger {
    color: #d65b59 !important;
  }
</style>
