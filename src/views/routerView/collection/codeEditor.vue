<template>
  <div class="codeWrapper">
    <codemirror
      ref="cmEditor"
      :value="code"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @blur="onCmBlur"
      @input="onCmCodeChange"
      class="condemirror"
      :class="{runcode:codeRun == true}"
    />
    <div class="codeRun" v-if="codeRun">
      <div class="codeResultWrapper">
        <span>编译结果：</span>
        <div class="codeResult" id="codeResult">
          {{ codeResult }}

        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
 
import { codemirror } from 'vue-codemirror'
// import base style
import 'codemirror/lib/codemirror.css'
// import language js
import 'codemirror/mode/javascript/javascript.js'
// import theme style
import 'codemirror/theme/base16-dark.css'
// import more 'codemirror/some-resource...'
export default {
    name: "codemirrorDemo",
    components: {
    codemirror
  },
  data () {
    return {
      codeResult:null,
      code: '',
      placeholder:"// 使用ctrl+s可编译代码 创建方法时记得调用",
      codeRun:false,
      cmOptions: {
        theme: 'base16-dark',
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        lineWrapping: true,
        hintOptions: {//自定义提示选项
            tables: {
              users: ['name', 'score', 'birthDate'],
              countries: ['name', 'population', 'size']
            }
          }
      },
      codeResult:'无编译内容',
    }
  },
  methods: {
    onCmReady(cm) {
      //创建完了
      this.code = this.placeholder
    },
    onCmFocus(cm) {
      //聚焦方法
      if(this.code == this.placeholder){
        this.code = ''
      }
    },
    onCmBlur(){
      if(this.code == ''){
        this.code = this.placeholder
      }
    },
    onCmCodeChange(newCode) {
      //持续监听
      this.code = newCode
      this.codeRun = false
    },
    runSave(code){
      try{
        let coderes = eval(code)
        if(!coderes || coderes == ''){
          this.codeResult = '无编译内容'
        }else{
          this.codeResult = coderes
        }
      }catch(e){
        this.codeResult = e
      }
      
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  mounted() {
    // you can use this.codemirror to do something...
    let that = this
    this.codeResult = document.getElementById('codeResult')
    document.addEventListener('keydown',function(e){
      if(e.ctrlKey && e.keyCode == 83){
        e.preventDefault()
        that.runSave(that.code)
        if(that.code == ''){
          return
        }
        that.codeRun = true
      }
    })
  }
}
</script>
<style lang="less">
.codeWrapper,.condemirror,.CodeMirror{
  width: 100%;
  height: 100%;
}
.codeWrapper{
  overflow: hidden;
  position: relative;
}
.runcode{
  height: 70%;
}
.codeRun{
  width: 100%;
  height: 30%;
  padding: 20px;
  background: #151515;
  position: absolute;
  bottom: 0;
  left: 0;
}
.codeResultWrapper{
  width: 100%;
  height: 100%;
  background: #151515;
  padding: 5px 15px;
  color: #fff;

}
.codeResult{
  padding: 5px;
  margin: auto;
  font-size: 16px;
  width: 100%;
  height: 80%;
  color: #fff;
  background: #151515;
}
</style>