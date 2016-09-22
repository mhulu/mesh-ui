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
            <div class="col-md-3 col-sm-6"><label><i class="fa fa-building"></i> 工作单位</label><input type="text" class="form-control underline" placeholder="可选填"></div>
            <div class="col-md-3 col-sm-6"><label><i class="fa fa-phone"></i> 本人电话</label><input type="text" class="form-control underline" placeholder="选填手机或固话"></div>
            </div>
            <div class="row">
            <div class="col-md-3 col-sm-6"><label><i class="fa fa-user-plus"></i> 联系人姓名</label><input type="text" class="form-control underline" placeholder="可选填"></div>
              <div class="col-md-3 col-sm-3">
                <div class="from-group"><label><i class="fa fa-volume-control-phone"></i> 联系人电话</label><input type="text" class="form-control underline" placeholder="选填手机或固话"></div>
              </div>
              <div class="col-md-3 col-sm-3">
                <div class="from-group"><label><i class="fa fa-"></i>常住类型</label>
                  <elastic-sel></elastic-sel>
                </div>
              </div>
              <div class="col-md-3 col-sm-3">
                <div class="from-group"><label><i class="fa fa-"></i></label></div>
              </div>
              <div class="col-md-3 col-sm-3">
                <div class="from-group"><label><i class="fa fa-"></i></label></div>
              </div>
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
<pre class="margin-top-15">
  {{validates|json}}
</pre>
</div>
</div>
</template>

<script>
  import elasticSel from '../components/form/ElasticSelector.vue'
  import wizard from '../components/form/wizard'
  import {parseIdentify} from '../utils'
  export default {
    data () {
      return {
        userInfo: {
          sex: '',
          birthday: ''
        },
        steps: [{title: '基本信息', desc: '填写居民基本信息'}, {title: '健康体检', desc: '填写居民体检信息'}, {title: '评价指导', desc: '健康评价和指导'}, {title: '完成提交', desc: '核对信息'}],
        groups: ['profile', 'result', 'guide', 'finish']
      }
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
      elasticSel, wizard
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