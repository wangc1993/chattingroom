<template>
  <div class="logo_box">
    <h3>易聊欢迎您</h3>
    <div class="form">
      <div class="input_outer">
        <span class="u_user"></span>
        <input
          name="logname"
          placeholder="输入ID或用户名登录"
          class="text"
          type="text"
          @keydown="enter"
          @input="nameChange"
        />
      </div>
      <div class="input_outer">
        <span class="us_uer"></span>
        <input
          name="logpass"
          class="text"
          type="password"
          placeholder="输入密码"
          @keydown="enter"
          @input="pwdChange"
        />
      </div>
      <div class="mb2">
        <a
          class="act-but submit"
          href="javascript:;"
          style="color: rgb(47, 167, 46)"
          @click="login"
        >登录</a>
      </div>
    </div>

    <div class="sas">
      还没有账号，
      <a href="javascript:;" @click="toRegister" style="color: rgb(47, 167, 46)">去注册</a>
    </div>
  </div>
</template>

<script>
import { login } from "../actions/interface.js";
import { setCookie } from "../utils/util.js";
export default {
  data() {
    return {
      password: "",
      username: ""
    };
  },
  methods: {
    toRegister() {
      this.$router.push({ name: "register" });
    },
    nameChange(e) {
      this.username = e.target.value.trim();
    },
    pwdChange(e) {
      this.password = e.target.value.trim();
    },
    enter(e) {
      if (e.keyCode === 13) {
        this.login();
      }
    },
    login() {
      const that = this;
      if (that.username) {
        login(that.username, that.password)
          .then(res => {
            if (res && res.state === "success") {
              setCookie("token", res.data.token);
              that.$store.commit("setToken", res.data.token);
              setCookie("username", that.username);
              that.$store.commit("setUsername", that.username);
              that.$router.push({ name: "home" });
              //发送登录信息
              this.$store.state.socket.emit("userLogin", {
                avatar: res.data.avatar,
                username: res.data.username
              });
            } else {
              throw new Error(res && res.msg);
            }
          })
          .catch(e => {
            alert(e.message);
          });
      } else {
        alert("用户名不能为空");
      }
    }
  }
};
</script>

<style lang="scss">
.logo_box {
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