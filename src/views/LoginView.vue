<template>
  <div class="loginWarpper">
    <div class="warpper">
      <h1 class="loginTitle">Login</h1>
      <div class="userName">
        <div class="nameTitle">账号:</div>
        <Input size="large" v-model="user" placeholder="请输入账号" class="nameWarpper"></Input>
      </div>
      <div class="passwordWarpper">
        <div class="passwordTitle">密码:</div>
        <Input size="large" placeholder="请输入密码" v-model="passWord" class="password" type="password"></Input>
      </div>
      <Button type="info" :loading="btnLoadin" class="loginButton" @click="login()">
        登录
      </Button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data(){
    return{
      user:'',
      passWord:'',
      btnLoadin:false,
    }
  },
  mounted(){
    if(window.sessionStorage.getItem('userId')){
      window.sessionStorage.clear()
    }
  },
  components: {
  },
  methods:{
    login(){
      //需要登录接口
      this.btnLoadin = true;
      let data = {
        name:this.user,
        password:this.passWord
      }
      if(this.user && this.passWord){
        this.$axios.post('/api/sysuser/get',data,(res)=>{
          if(res && res.length>0){
            if(res[0].password !=''){
              window.sessionStorage.setItem('userId',res[0].userId)
              window.sessionStorage.setItem('isSuper',res[0].isSuper)
              this.btnLoadin = false;
              this.$myMessage({
                content:'登陆成功',
                messageType:'success'
              })
              this.$router.push('/mainPage')
            }else{
              this.btnLoadin = false;
              this.$myMessage({
                content:'密码错误',
                messageType:'error'
              })
            }
          }else{
            this.btnLoadin = false;
            this.$myMessage({
              content:'非内部用户  登陆失败',
              messageType:'error'
            })
          }
        })
      }else{
        this.btnLoadin = false;
        this.$myMessage({
          content:'请输入密码',
          messageType:'error'
        })
      }
      
      
    }
  }
}
</script>
<style lang="less">
.loginWarpper{
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  text-align: center;
  .warpper{
    transform: translateY(100%);
  }
  .loginTitle{
    color: white;
    margin: 0;
  }
  .userName,.passwordWarpper{
    .nameTitle,.passwordTitle{
      color: white;
      font-size: 20px;
      display: inline-block;
      margin-right: 20px;
    }
    .nameWarpper,.password{
      display: inline-block;
      width: 40%;
    }
    text-align: center;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .loginButton{
    font-size: 20px;
    line-height: 20px;
    width: 100px;
    height: 40px;
  }
}

</style>