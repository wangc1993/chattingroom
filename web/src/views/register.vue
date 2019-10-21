<template>
  <div class="register_box">
    <h3>易聊欢迎您</h3>
    <div class="form">
      <div class="input_outer">
        <span class="u_user"></span>
        <input name="logname" placeholder="输入ID或用户名注册" class="text" type="text" @input="nameChange"/>
      </div>
      <div class="input_outer">
        <span class="us_uer"></span>
        <input name="logpass" class="text" type="password" placeholder="输入密码" @input="pwdChange"/>
      </div>
      <div class="mb2">
        <a class="act-but submit" href="javascript:;" style="color: rgb(47, 167, 46)" @click="register">注册</a>
      </div>
    </div>

    <div class="sas">
      已有账号，<a href="javascript:;" @click="toLogin" style="color: rgb(47, 167, 46)">去登陆</a>
    </div>
  </div>
</template>

<script>
import { register } from '../actions/interface.js';
export default {
  data() {
    return {
      password: "",
      username: ""
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "login" });
    },
    nameChange(e){
      this.username = e.target.value.trim();
    },
    pwdChange(e){
      this.password = e.target.value.trim();
    },
    register(){
      register(this.username,this.password).then(res => {
        if(res && res.state === 'success'){
          this.$router.push({name: 'login'});
        }else{
          throw new Error(res && res.msg);
        }
      }).catch(e => {
        console.log(e.message)
      })
    }
  }
};
</script>

<style lang="scss">
.register_box {
  width: 350px;
  padding: 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -200px;
  h3 {
    text-align: center;
    font: 24px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei",
      sans-serif;
    color: rgb(47, 167, 46);
    height: 40px;
    line-height: 40px;
    padding: 0 0 35px 0;
  }
  .forms {
    width: 280px;
    height: 485px;
  }
  .logon_inof {
    width: 100%;
    min-height: 450px;
    padding-top: 35px;
    position: relative;
  }
  .input_outer {
    height: 46px;
    padding: 0 5px;
    margin-bottom: 20px;
    border-radius: 50px;
    position: relative;
    border: #496b49 2px solid !important;
  }
  .u_user {
    width: 25px;
    height: 25px;
    background: url(../assets/login_ico.png);
    background-position: -125px 0;
    position: absolute;
    margin: 12px 13px;
  }
  .us_uer {
    width: 25px;
    height: 25px;
    background-image: url(../assets/login_ico.png);
    background-position: -125px -34px;
    position: absolute;
    margin: 12px 13px;
  }
  label {
    color: rgb(255, 255, 255);
    display: block;
  }
  .text {
    width: 220px;
    height: 46px;
    outline: none;
    display: inline-block;
    font: 14px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei";
    margin-left: 50px;
    border: none;
    background: none;
    line-height: 46px;
  }
  .mb2 {
    margin-bottom: 20px;
  }
  .mb2 a {
    height: 46px;
    text-decoration: none;
    outline: none;
  }
  .submit {
    padding: 15px;
    margin-top: 20px;
    display: block;
  }
  .act-but {
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    border-radius: 50px;
    background: #30343557;
    &:hover {
      background: #36984357;
    }
  }
  /*////*/
  .check {
    width: 280px;
    height: 22px;
  }
  .clearfix::before {
    content: "";
    display: table;
  }
  .clearfix::after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
  .login-rm {
    float: left;
  }
  /*////*/
  .sas {
    width: 280px;
    height: 18px;
    float: left;
    color: #ffffff;
    text-align: center;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 50px;
  }
  .sas a {
    width: 280px;
    height: 18px;
    color: #ffffff;
    text-align: center;
    line-height: 18px;
    text-decoration: none;
  }
}
</style>