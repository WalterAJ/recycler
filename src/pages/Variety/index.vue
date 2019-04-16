<template>
  <div class="personal">
    <my-header title="回收类别"></my-header>
    <div class="person-content" ref="bd">
      <div class="personal-option">
        <div class="list" v-for="item in options" :key="item.type">
          <div class="left">
            <img src="/static/icons/余额.png" alt="余额" class="icon">
            <span>{{item.type}}</span>
          </div>
          <div class="right">
            <el-switch v-model="item.selected" active-color="#6ee0ff" inactive-color="#CCC"></el-switch>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <button class @click="dialogVisible = true">添加</button>
      <button class @click="save()">保存</button>
    </div>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="80%" >
      <el-input v-model="newVal" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import axios from "axios"
import { Toast } from "mint-ui";
export default {
  mounted() {
    let selVariety = window.localStorage.getItem('selVariety');
    let variety = window.localStorage.getItem('variety');
    let options = [];
    variety =  variety.split('-');
    selVariety =  selVariety.split('-');
    variety.forEach(function(item){
      let temp = {
        type: item,
        selected: false
      }
      options.push(temp);
    })
    options.forEach(function(item){
      selVariety.forEach(function(el){
        if(el == item.type){
          item.selected = true;
        }
      })
    })
    this.options = options;
  },
  components: {
    MyFooter,
    MyHeader
  },
  data() {
    return {
			switch1: true,
			dialogVisible: false,
			newVal:'',
      options: [
      ]
    };
  },
  methods: {
		add(){
			let temp = {
				type : this.newVal,
				selected: true
			}
			this.options.push(temp);
			this.dialogVisible = false;
		},
		save(){
			let variety = [],selVariety = [];
			this.options.forEach(function(item){
        variety.push(item.type);
        console.log(item.selected);
        
				if(item.selected){
						selVariety.push(item.type);
				}
			})
			variety = variety.join('-');
			selVariety = selVariety.join('-');
		
			axios.post('/api/recycler/userInfo/setVariety',{
				variety: variety,
				selVariety: selVariety,
				username: window.localStorage.getItem('username')
			})
			.then(res => {
          window.localStorage.setItem('selVariety',selVariety);
          window.localStorage.setItem('variety',variety);
          Toast({
                message: "保存成功!",
                position: "bottom",
                duration: 2000
          });
          this.$router.push('/personal')
			})
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
  background: #fff;
}
.bg-contanier {
  z-index: -1;
  top: 0;
  height: 30vh;
  overflow: hidden;
}
.personal-bg {
  position: relative;
  top: -130vh;
  right: 52vh;
  width: 160vh;
  height: 160vh;
  border-radius: 80%;
  background: linear-gradient(to right, #6ee0ff 25%, #32aafa 50%);
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
  border-bottom: 3px solid #f2f2f2;
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
.btn-group {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 5px;
}
.btn-group button {
  padding: 0;
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 22px;
  background: linear-gradient(to right, #6ee0ff, #32aafa);
  font-family: "\82F9\65B9";
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
</style>



