<template>
  <div class="loginWarpper">
    <div class="warpper">
      <!-- <h1 class="loginTitle">Login</h1>
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
      </Button> -->
        <div class="login-box">
 
          <form>
            <div class="user-box">
              <input required="" name="" v-model="user" type="text">
              <label>Username</label>
            </div>
            <div class="user-box">
              <input required="" v-model="passWord" name="" type="password">
              <label>Password</label>
            </div>
              <center>
                <a href="#" @click="login()" v-if="!btnLoadin">
                        SEND
                    <span></span>
                </a>
                <a href="#" v-else>
                        Loading
                    <span></span>
                </a>
              </center>
          </form>
        </div>
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
              this.$router.push('/')
              this.$myMessage({
                content:'登陆成功',
                messageType:'success'
              })
              
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
  background: rgba(0, 0, 0, 0.9);
  text-align: center;
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(24, 20, 20, 0.987);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #bdb8b8;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #03f40f;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03f40f,
              0 0 20px #03f40f,
              0 0 30px #03f40f,
              0 0 30px #03f40f;
}

.login-box a span {
  position: absolute;
  display: block;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(1) {
  bottom: 2px;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03f40f);
  animation: btn-anim1 2s linear infinite;
}
</style>