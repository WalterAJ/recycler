<template>
  <div class="personal">
    <my-header title="帮助"></my-header>
    <div class="person-content" ref="bd">
      <div class="personal-option">
        <div class="list">
          <div class="left">
            <span>账号管理</span>
          </div>
          <div class="right">
            <img src="/static/icons/rightArrow.png" alt="arrow" class="arrow">
          </div>
        </div>

        <div class="list">
          <div class="left">
            <span>绑定手机</span>
          </div>
          <div class="right">
            <img src="/static/icons/rightArrow.png" alt="arrow" class="arrow">
          </div>
        </div>
        <div class="list" @click="dialogVisible = true">
          <div class="left">
            <span>修改密码</span>
          </div>
          <div class="right">
            <img src="/static/icons/rightArrow.png" alt="arrow" class="arrow">
          </div>
        </div>
        <div class="list" style="border-top:7px solid #f2f2f2;">
          <div class="left">
            <span>支付设置</span>
          </div>
          <div class="right">
            <img src="/static/icons/rightArrow.png" alt="arrow" class="arrow">
          </div>
        </div>
        <div class="list">
          <div class="left">
            <span>安全中心</span>
          </div>
          <div class="right">
            <img src="/static/icons/rightArrow.png" alt="arrow" class="arrow">
          </div>
        </div>
        <div class="list">
          <div class="left">
            <span>通用</span>
          </div>
          <div class="right">
            <img src="/static/icons/rightArrow.png" alt="arrow" class="arrow">
          </div>
        </div>
        <div class="list">
          <div class="left">
            <span>关于点滴回收</span>
          </div>
          <div class="right">
            <img src="/static/icons/rightArrow.png" alt="arrow" class="arrow">
          </div>
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="80%" class="modify">
        <el-input v-model="password" placeholder="请输入原密码" type="password"></el-input>
        <el-input v-model="newpassword" placeholder="请输入新密码" type="password"></el-input>
        <el-input v-model="newpasswordA" placeholder="请输入新密码" type="password"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="modify()">确 定</el-button>
        </span>
      </el-dialog>

      <div ref="fillPg" class="fill-pg"></div>
    </div>
  </div>
</template>
<script>
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import { Toast } from "mint-ui";
import axios from "axios";
export default {
  mounted() {
   
  },
  components: {
    MyFooter,
    MyHeader
  },
  data() {
    return {
      password: "",
      newpassword: "",
      newpasswordA: "",
      switch1: true,
      dialogVisible: false,
      func: [
        { title: "待上门", url: "/static/img/door.png" },
        { title: "待确认", url: "/static/icon/order-processing.png" },
        { title: "已完成", url: "/static/icon/order-over.png" },
        { title: "全部订单", url: "/static/icon/order.png" }
      ],

      options: [
        { title: "我的钱包", url: "/static/icon/钱包.png" },
        { title: "我的地址簿", url: "/static/icon/地址.png" },
        { title: "成为大商户", url: "/static/icon/地址.png" },
        { title: "联系客服", url: "/static/icon/客服.png" },
        { title: "帮助和反馈", url: "/static/icon/问题反馈.png" },
        { title: "设置", url: "/static/icon/设置.png" }
      ]
    };
  },
  methods: {
    modify() {
			this.dialogVisible = false;
      axios
        .get(
          "/api/recycler/userInfo/login",
          {
            params: {
              username: window.localStorage.getItem('username'),
              password: this.password
            }
          },
          {}
        )
        .then(res => {
          if (res.data.length > 0) {
						
            if (this.newpassword != this.newpasswordA) {
              Toast({
                message: "两次密码输入不正确!",
                position: "bottom",
                duration: 2000
              });
            } else{
							axios.post("/api/recycler/userInfo/modify",{
								username: window.localStorage.getItem('username'),
              	password: this.newpassword
							}).then(res => {
								Toast({
                	message: "密码修改成功!",
                	position: "bottom",
                	duration: 2000
              	});
							})
						}
						
          } else{
						Toast({
                message: "密码输入错误!",
                position: "bottom",
                duration: 2000
              });
					}
        });
    }
  }
};
</script>
<style scoped>
.fill-pg {
  background: #f2f2f2;
}
.g-ft {
  position: fixed;
  height: 48px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: #fff;
}
.personal {
  width: 100vw;
  height: 100vh;
  background: rgb(242, 242, 242);
  overflow: hidden;
}
.bg-contanier {
  z-index: -1;
  top: 0;
  height: 30vh;
  overflow: hidden;
}
.personal-bg {
}
.person-content {
  margin-top: 48px;
  width: 100%;
  position: absolute;
  top: 0;
}
.personal-avatar {
  margin: 0 auto;
  background-size: 100%;
  border: #fff solid 2px;
  width: 62px;
  height: 62px;
  border-radius: 31px;
}
.personal-login {
  margin: 0 auto;
  margin-top: 21px;
  width: 119px;
  height: 30px;
  border-radius: 15px;
  border: #fff solid 1px;
  color: white;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
}

.personal-function {
  margin-top: 30px;
  border-bottom: #f2f2f2 solid 5px;
  display: flex;
}
.func-item {
  text-align: center;
  height: 110px;
  width: 25%;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}
.history,
.star {
  width: 50%;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.personal-option {
  margin-top: 8px;
  background-color: #fff;
}
.personal-function .title {
  color: #333;
  font-size: 0.75rem;
  margin-top: 0.6rem;
}
.wp .value {
  color: #ffaa42;
  font-size: 1rem;
}
.wp {
  width: 100%;
  height: 3rem;
  border-right: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
}

img.order {
  width: 1.5rem;
  height: 1.5rem;
}
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #f2f2f2;
}

.list .left {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.875rem;
}

.list .right {
  display: flex;
  align-items: center;
  color: rgb(153, 153, 153);
  font-size: 0.75rem;
}

.list .left img {
  margin-right: 0.8rem;
}
.arrow {
  width: 1.8125rem;
  height: 1.8125rem;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
}
.personal-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.el-input {
  margin-bottom: 5px;
}
</style>



