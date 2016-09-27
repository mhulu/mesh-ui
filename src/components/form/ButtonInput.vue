<template>
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <fieldset>
                        <legend>{{title}}</legend>
                        <div class="row">
                          <div class="col-md-2">
                            <label class="text-bold text-purple label-lg">{{labelName}}</label><span class="badge badge-purple">{{userInfo.sicks.length}}</span>
                          </div>
                          <div class="col-md-10">
                            <div style="float:left">
                              <a  v-for="(index, btn) in buttons" style="margin:0 2px 0 2px" class="btn" :class="[styles[index]]" @click.stop.prevent="onClickBtn($event)">{{btn}}</a>
                            </div>
                            <div style="float:left; margin-left:15px">
                            <span class="clip-select">
                              <select v-model="sicks" class="form-control" @change="onChanged()">
                                <option v-for="option in options.sicks" :value="option">{{option}}</option>
                              </select>
                            </span>
                          </div>
                          </div>
                          
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <ul  class="list-unstyled sicks">
                              <li class="margin-top-15">
                                <input type="text" class="form-control  underline input-title" v-show="showInput" v-el:newtext v-model="newText" :placeholder="'输入' + textPre" @keyup.enter="addNew($event)">
                                <a class="btn-success add shake" v-show="this.newText.trim() !=''" @click="addNew($event)"><i class="fa fa-plus"></i></a>
                              </li>
                              <li v-for="item in data" track-by="$index">
                                <input type="text" v-model="item" class="form-control underline margin-top-15">
                                <a class="btn-danger destroy" @click="remove(item)"><i class="fa fa-times"></i></a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
</template>
<script>
  import {API_ROOT} from '../../config'
  export default {
    props: {
      id: {
        type: String,
        default: 'id1'
      },
      data: {
        type: Object
      },
      title: {
        type: String,
        default: 'TITLE'
      },
      buttons: {
        type: Array,
        default: ['按钮1', '按钮2', '按钮3']
      },
      labelName: {
        type: String,
        default: '病史记录'
      }
    },
    data () {
      return {
        styles: ['btn-purple', 'btn-blue', 'btn-yellow', 'btn-red', 'btn-green', 'btn-azure'],
        options: {},
        showInput: false,
        newText: '',
        textPre: ''
      }
    },
    methods: {
      onClickBtn (e) {
        this.showInput = true
        this.$els.newtext.focus()
        this.textPre = e.target.innerText
      },
      addNew (e) {
        window.console.log(this.$refs)
      }
    },
    ready: function () {
      this.$http.get(API_ROOT + 'options').then((response) => {
        this.options = response.data.result
      }, (response) => {
        window.console.log('err')
      })
    },
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