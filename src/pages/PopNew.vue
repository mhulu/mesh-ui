<template>
 <div>
  <h5 class="over-title margin-bottom-15">要把档案存到数据库里拢共需<span class="text-bold">4步</span></h5>
  <div>
    <validator name="validation" :groups="groups">
     <form action="">
      <wizard :steps.sync="steps" :validates.sync="validates">
        <div slot="1" class="container">
        <div class="row">
          <div class="col-md-3 col-sm-6">
            <div class="form-group">
              <label>
                <i class="fa fa-user"></i> 居民姓名: <span v-if="$validation.name.chinese"><i class="fa fa-exclamation-circle text-red"></i></span><span v-else><i class="fa fa-check-circle text-success"></i></span>
              </label>
              <input type="text" class="form-control underline" id="name" placeholder="输入居民的姓名" group="profile" v-model="userInfo.userName"
              v-validate:name="{ chinese: true }">
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="form-group">
              <label>
                <i class="fa fa-credit-card"></i> 身份证: <span v-if="$validation.identify.identify"><i class="fa fa-exclamation-circle text-red"></i></span><span v-else><i>{{userInfo.sex}}/{{userInfo.birthday}}</i></span>
              </label>
              <input type="text" class="form-control underline" placeholder="15或18位身份证" group="profile" v-model="userInfo.identify" v-validate:identify="{ identify: true }" @valid="parseIdentify">
            </div>
          </div>
          <div class="col-md-3 col-sm-6"><label><i class="fa fa-building"></i> 工作单位</label><input type="text" class="form-control underline" placeholder="可选填" v-model="userInfo.unit"></div>
          <div class="col-md-3 col-sm-6"><label><i class="fa fa-phone"></i> 本人电话</label><input type="text" class="form-control underline" placeholder="选填手机或固话" v-model="userInfo.phone"></div>
        </div>
        <div class="row">
          <toggle>
            <div slot="content">
              <div class="margin-top-15 fadeInUp">

                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>
                        常住类型
                      </label>
                      <div class="clip-radio radio-primary">
                        <input type="radio" id="local" value="户籍" v-model="userInfo.live">
                        <label for="local">
                          户籍
                        </label>
                        <input type="radio" id="nonlocal" value="非户籍" v-model="userInfo.live">
                        <label for="nonlocal">
                          非户籍
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label>
                      民族
                    </label>
                    <div class="row">
                      <div class="clip-radio radio-primary">

                        <input type="radio" id="han" value="汉族" v-model="userInfo.nation">
                        <label for="han">
                          汉族
                        </label>
                        <input type="radio" id="other" value="少数民族" v-model="userInfo.nation">
                        <label for="other">
                          <input type="text" class="underline" placeholder="少数民族" @click="userInfo.nation = ''"  v-model="userInfo.nation">
                        </label>

                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 form-group">
                    <label>
                      血型
                    </label>
                    <span class="clip-select">
                      <select v-model="userInfo.bloodType" class="form-control">
                        <option v-for="option in options.bloodType" :value="option">{{option}}</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 form-group">
                    <label>文化程度</label>
                    <span class="clip-select">
                      <select v-model="userInfo.education" class="form-control">
                        <option v-for="option in options.education" :value="option">{{option}}</option>
                      </select>
                    </span>
                  </div>
                  <div class="col-md-4 form-group">
                    <label>职业</label>
                    <span class="clip-select">
                      <select v-model="userInfo.occupation" class="form-control">
                        <option v-for="option in options.occupation" :value="option">{{option}}</option>
                      </select>
                    </span>
                  </div>
                  <div class="col-md-4 form-group">
                    <label>婚姻状况</label>
                    <span class="clip-select">
                      <select v-model="userInfo.marriage" class="form-control">
                        <option v-for="option in options.marriage" :value="option">{{option}}</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 form-group">
                    <label>支付方式</label>
                    <span class="clip-select">
                      <select v-model="userInfo.payType" class="form-control">
                        <option v-for="option in options.payType" :value="option">{{option}}</option>
                      </select>
                    </span>
                  </div>
                  <div class="col-md-4 form-group">
                    <label>药物过敏史</label>
                    <span class="clip-select">
                      <select v-model="userInfo.allergy" class="form-control">
                        <option v-for="option in options.allergy" :value="option">{{option}}</option>
                      </select>
                    </span>
                  </div>
                  <div class="col-md-4 form-group">
                    <label>暴露史</label>
                    <span class="clip-select">
                      <select v-model="userInfo.exposure" class="form-control">
                        <option v-for="option in options.exposure" :value="option">{{option}}</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                    <fieldset>
                      <legend>既往史</legend>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-2">
                              <label class="text-bold text-purple label-lg">病史记录：</label><span class="badge badge-purple">{{userInfo.sicks.length}}</span>
                            </div>
                            <div class="col-md-6">
                              <a class="btn btn-purple" @click.stop.prevent="onShowInput($event)">疾病史 <i class="fa fa-plus"></i></a>
                              <a class="btn btn-blue"  @click.stop.prevent="onShowInput($event)">手术史 <i class="fa fa-plus"></i></a>
                              <a class="btn btn-warning"  @click.stop.prevent="onShowInput($event)">外伤史 <i class="fa fa-plus"></i></a>
                              <a class="btn btn-danger" @click.stop.prevent="onShowInput($event)">输血史 <i class="fa fa-plus"></i></a>
                            </div>
                            <div class="col-md-4">
                              <span class="clip-select">
                                <select v-model="sicks" class="form-control" @change="onChanged()">
                                  <option v-for="option in options.sicks" :value="option">{{option}}</option>
                                </select>
                              </span>
                            </div>
                          </div>
                          <ul  class="list-unstyled sicks">
                          <li class="margin-top-15">
                            <input type="text" class="form-control  underline input-title" v-show="showInput" v-el:newsick v-model="newSick" :placeholder="'输入' + sickPre" @keyup.enter="addSick()">
                            <a class="btn-success add shake" v-show="this.newSick.trim() !=''" @click="addSick()"><i class="fa fa-plus"></i></a>
                            </li>
                            <li v-for="sick in userInfo.sicks" track-by="$index">
                              <input type="text" v-model="sick" class="form-control underline margin-top-15">
                              <a class="btn-danger destroy" @click="removeSick(sick)"><i class="fa fa-times"></i></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-4 form-group"></div>
                  <div class="col-md-4 form-group"></div>
                </div>
              </div>
            </div>
          </toggle>
        </div>
      </div>
        <div class="container" slot="2">
          <div class="row">
            <div class="col-md-3 col-sm-6">
              <div class="form-group">
                <label>
                  <i class="fa fa-user"></i> 居民姓名: <span v-if="$validation.name.chinese"><i class="fa fa-exclamation-circle text-red"></i></span><span v-else><i class="fa fa-check-circle text-success"></i></span>
                </label>
                <input type="text" class="form-control underline" id="name" placeholder="输入居民的姓名" group="result" v-model="userInfo.aa"
                v-validate:aa="{ chinese: true }">
              </div>
            </div>
            
            <div class="col-md-3 col-sm-6"><label><i class="fa fa-building"></i> 工作单位</label><input type="text" class="form-control underline" placeholder="可选填"></div>
            <div class="col-md-3 col-sm-6"><label><i class="fa fa-phone"></i> 本人电话</label><input type="text" class="form-control underline" placeholder="选填手机或固话"></div>
            
          </div>
        </div>
      </div>
    </wizard>
  </form>
</validator>
</div>
</div>
</template>

<script>
  import elasticSel from '../components/form/ElasticSelector.vue'
  import {API_ROOT} from '../config'
  import wizard from '../components/form/wizard'
  import toggle from '../components/Toggle'
  import {parseIdentify} from '../utils'
  export default {
    data () {
      return {
        options: {},
        sicks: '',
        showInput: false,
        newSick: '',
        sickPre: '',
        userInfo: {
          sex: '',
          birthday: '',
          sicks: []
        },
        steps: [{title: '基本信息', desc: '填写居民基本信息'}, {title: '健康体检', desc: '填写居民体检信息'}, {title: '评价指导', desc: '健康评价和指导'}, {title: '完成提交', desc: '核对信息'}],
        groups: ['profile', 'result', 'guide', 'finish']
      }
    },
    ready: function () {
      this.$http.get(API_ROOT + 'options').then((response) => {
        this.options = response.data.result
      }, (response) => {
        window.console.log('err')
      })
    },
    methods: {
      onSubmit () {
        var formData = {
          name: this.userInfo.userName
        }
        console.log(formData)
      },
      parseIdentify () {
        var result = parseIdentify(this.userInfo.identify)
        this.userInfo.sex = result.sex
        this.userInfo.birthday = result.birthday
      },
      onShowInput (e) {
        this.showInput = true
        this.$els.newsick.focus()
        this.sickPre = e.target.innerText
      },
      onChanged () {
        this.newSick += this.sicks
      },
      addSick () {
        var value = this.newSick && this.newSick.trim()
        if (!value) {
          return
        }
        this.userInfo.sicks.push(this.sickPre + ': ' + value)
        this.newSick = ''
      },
      removeSick (sick) {
        this.userInfo.sicks.$remove(sick)
      }
    },
    components: {
      toggle, wizard
    },
    computed: {
      validates: function () {
        var result = []
        for (var i = 0; i < this.groups.length; i++) {
          result[i] = this.$validation[this.groups[i]].invalid
        }
        return result
      }
    }
  }
</script>
<style>
  .label-lg{
    height: 34px;
    line-height: 34px;
    text-align: right;
  }
  .input-title{
    border: 1px dotted #c8c7cc !important;
  }
  .sicks li{
    position: relative;
  }
  .add {
    position: absolute;
    top: 0;
    text-align: center;
    right: 6px;
    bottom: 0;
    width: 28px;
    height: 28px;
    margin: auto 0;
    font-size: 18px;
    color: #fff;
    background-color: #d21818;
    margin-bottom: 10px;
    transition: color 0.2s ease-out;
    border:0;
  }
  .destroy {
    position: absolute;
    top: 0;
    text-align: center;
    right: 6px;
    bottom: 0;
    width: 28px;
    height: 28px;
    margin: auto 0;
    font-size: 18px;
    color: #fff;
    background-color: #d21818;
    margin-bottom: 10px;
    transition: color 0.2s ease-out;
    border:0;
  }
  .destroy:hover {
    background-color: #ec6161;
  }

</style>