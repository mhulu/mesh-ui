<template>
 <div>
  <h5 class="over-title margin-bottom-15">要把档案存到数据库里拢共需<span class="text-bold">4步</span></h5>
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
                  <button-input title="既往史" :buttons="sicksBtn" :collection.sync="userInfo.sicks" :options="options.sicks"></button-input>
                  <button-input title="家族史" :buttons="familyBtn" :collection.sync="userInfo.family" label="家族病史记录" :options="options.sicks"></button-input>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group"><label>遗传病史</label><input v-model="userInfo.inheritance" class="form-control underline" type="text"></div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                      <label>残疾情况</label>
                      <span class="clip-select">
                        <select v-model="userInfo.disability" class="form-control">
                          <option v-for="option in options.disability" :value="option">{{option}}</option>
                        </select>
                      </span>
                      </div>
                    </div>
                  </div>
                  <button-input title="生活环境" :buttons="envBtn" :collection.sync="userInfo.environment" option-nested="true" :options="options.enviroment"></button-input>
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
      </wizard>
    </form>
  </validator>
  <pre>
    {{options|json}}
  </pre>  
</div>
</template>

<script>
  import buttonInput from '../components/form/ButtonInput.vue'
  import {API_ROOT} from '../config'
  import wizard from '../components/form/wizard'
  import toggle from '../components/Toggle'
  import {parseIdentify} from '../utils'
  export default {
    data () {
      return {
        options: {},
        userInfo: {
          sex: '',
          birthday: '',
          sicks: [],
          family: [],
          environment: []
        },
        steps: [{title: '基本信息', desc: '填写居民基本信息'}, {title: '健康体检', desc: '填写居民体检信息'}, {title: '评价指导', desc: '健康评价和指导'}, {title: '完成提交', desc: '核对信息'}],
        groups: ['profile', 'result', 'guide', 'finish'],
        sicksBtn: ['疾病史', '手术史', '外伤史', '输血史'],
        familyBtn: ['父亲病史', '母亲病史', '兄弟姐妹病史', '子女病史'],
        envBtn: ['厨房排风设施', '燃料类型', '饮水', '厕所', '禽畜栏'],
        optionGroup: ['kitchen', 'elding', 'drink', 'lavatory', 'sty']
      }
    },
    ready: function () {
      if (window.localStorage.getItem('wemesh.options') === null) {
        this.$http.get(API_ROOT + 'options').then((response) => {
          this.options = response.data.result
          window.localStorage.setItem('wemesh.options', JSON.stringify(this.options))
        })
      }
      this.options = JSON.parse(window.localStorage.getItem('wemesh.options'))
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
      }
    },
    components: {
      toggle, wizard, buttonInput
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