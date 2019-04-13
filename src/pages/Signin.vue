<template>
  <div>
    <div class="signin-bg">
      <div class="signin-bg-masking"></div>
    </div>
    <div class="signin-tel">
      <div class="siginin-tel-prompt" :class="{'active':focus}">中国大陆+86</div>
      <input
        name="tel"
        type="text"
        class="signin-input"
        placeholder="输入手机号码"
        @focus="isfocus"
        @blur="isblur"
        v-model="tel"
      >
    </div>
    <div class="signin-tel">
      <input
        type="password"
        class="signin-input"
        placeholder="输入密码"
        @focus="isfocus"
        @blur="isblur"
        v-model="password"
      >
    </div>
    <div class="signin-tel">
      <input
        type="password"
        class="signin-input"
        placeholder="输入手机号码"
        @focus="isfocus"
        @blur="isblur"
        v-model="cpassword"
      >
    </div>
    <div class="nextStep">
      <img src="/static/icons/next.png" alt @click="signin">
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      focus: false,
      tel: "",
      password: "",
      cpassword: ""
    };
  },
  methods: {
    isfocus: function() {
      this.focus = true;
    },
    isblur: function() {
      this.focus = false;
    },
    signin: function() {
      let textTel = new RegExp("^[1][3-8][0-9]{9}$");
      //验证手机号
      if (!textTel.test(this.tel)) {
        Toast({
          message: "请输入正确的手机号!",
          position: "bottom",
          duration: 2000
        });
        $("input[name=tel]").focus();
        return false;
      }
      if (!(this.password == this.cpassword)) {
        Toast({
          message: "密码输入不相同!",
          position: "bottom",
          duration: 2000
        });
        return false;
      }
       axios
        .post("/api/recycler/userInfo/signin",{
             username: this.tel,
             password: this.password
        },{})
        .then(res => {
           
           this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style scoped>
.signin-bg {
  height: 93px;
  width: 100%;
  background: linear-gradient(to right, #6ee0ff, #32aafa);
}
.nextStep {
  float: right;
  margin-right: 54px;
  margin-top: 34px;
  width: 60px;
  height: 50px;
}
.signin-bg-masking {
  position: relative;
  bottom: -63px;
  border-width: 15px;
  border-right-width: 50vw;
  border-left-width: 50vw;
  border-style: solid;
  border-color: transparent transparent white white;
}
.signin-tel:first {
  margin-top: 107px;
}
.signin-tel {
  margin: 0 auto;
  margin-top: 50px;
  width: 308px;
}
.siginin-tel-prompt {
  text-align: cAenter;
  color: #fff;
}
.active {
  color: #0188fb;
}
.signin-input {
  width: 100%;
  padding-bottom: 10px;
  background-color: #FFF !important;
  font-size: 22px;
  border: none;
  border-bottom: solid 2px #c9c9c9;
  outline: medium;
  text-align: center;
}
.signin-tel-input:focus::-webkit-input-placeholder {
  color: transparent;
}
.signin-tel-input::-webkit-input-placeholder {
  font-size: 22px;
  color: #999da5;
}

body {
  margin: 0;
}
img {
    width: 100%;
}
</style>

