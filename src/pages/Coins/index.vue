<template>
	<div class="g-coin">
		<my-header title="积分交易" style="position:fixed;top:0;width:100%; "></my-header>
		<yd-popup v-model="show" position="bottom" height="20%">
      <div class="pop-btn confirm-btn" @click='Buy'>
				确认购买
			</div>
      <div class="pop-btn cancel-btn" @click='changeShow'>
				取消
			</div>
    </yd-popup>
		<div class="m-hd">
			<div class="current">当前积分： <span class="value">{{yd}}</span></div>
			<div class="sort">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						默认排序<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>积分从高到低</el-dropdown-item>
						<el-dropdown-item>积分从低到高</el-dropdown-item>
						<el-dropdown-item>价格从高到低</el-dropdown-item>
						<el-dropdown-item>价格从低到高</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="reset">钱包余额： <span class="value">{{balance}}</span></div>
		</div>
		<div class="m-bd">
			<div class="u-order" v-for="(item,index) in ydList" :key='item.id'>
				<div class="hd">
					<div class="user">
						<img src="/static/img/avatar-1.jpg" alt="avatar" class='avatar'>
						<span class="name">用户B</span>
						<span class="address">浙江省 杭州市</span>
					</div>
					<div class="dt">
						<span class="data">{{item.date}}</span>
					</div>
				</div>
				<div class="bd">
					<img src="/static/icons/coinLogo.png" alt="coin" class='coin'>
					<div class="detail">
						<span class="desc">低价出售益点，可小刀</span>
						<span class="value">{{item.num}}益点</span>
					</div>
					<span class="value">￥{{item.price}}</span>
					<div class="buy-btn" @click='comfirm(index)'>购买</div>
				</div>
			</div>
			<div class='add-height'></div>
		</div>
	</div>
</template>
<script>
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
import './css/main.css'
import MyHeader from "@/components/MyHeader";
import axios from 'axios'
import { Toast } from 'mint-ui';
export default {
	components: {
		ydPopup: Popup,
		MyHeader
	},
	mounted(){
		this.yd = window.localStorage.getItem('yd');
		this.balance = window.localStorage.getItem('balance');
		 axios.get("/api/yd/getYd")
		 .then(res =>{
			 let list = res.data;
			 
			 list.forEach(function(item,index){
				 console.log(item);
				 let date = new Date(item.date); 
				 list[index].date = `${date.getUTCFullYear()}-${date.getMonth()}-${date.getDate()}`
			 })

			 this.ydList = list;
		 })
	},
	data() {
		return {
			show: false,
			ydList:[],
			yd:Number,
			balance:Number,
			index:Number
		}
	},
	methods: {
		comfirm(index){
			this.index = index;
			this.show = !this.show
			console.log(this.show)
		},
		changeShow() {
			this.show = !this.show
			console.log(this.show)
		},
		Buy() {
			this.show = !this.show
			 let ydInfo = this.ydList[this.index];
			 if(this.balance < ydInfo.price){
				 Toast({
              		message: "益点不足!",
              		position: "center",
              		duration: 2000
            	 });
			 }else{
				 this.yd = parseInt(this.yd) + parseInt(ydInfo.num);
				 this.balance -= ydInfo.price;
				 window.localStorage.setItem('yd', this.yd)
				 window.localStorage.setItem('balance', this.balance);
				 
			 }

		}
	}
};
</script>
<style scoped>
/* .yd-popup-content {
	background: #f4f4f4;
}
.yd-popup-content div {
	height: 100%;
} */
img.avatar {
	width: 1.25rem;
	height: 1.25rem;
	border-radius: 50%;
}
.g-coin {
  background: #fff;
  min-height: 100%;
}
.m-hd {
  width: 100%;
  height: 2.75rem;
  background: #fff;
   border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  position: fixed;
  top: 40px;
  left: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: #333;
	font-size: .875rem;
}
.m-hd .value {
	color: #FFAA42;
}
.m-bd {
  margin-top: 4.75rem;
	padding-top: 1px;
}

.u-order {
	background: #fff;
	box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.349019607843137);
	width: 95%;
	margin: 1rem auto;
}

.u-order .hd {
	padding: .3rem 1.4rem;
	border-bottom: 1px solid #f2f2f2;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.u-order .hd .user,
.u-order .hd .dt {
	display: flex;
	align-items: center;
}

.u-order .hd .user .name {
	margin-left: .5rem;
	margin-right: .8rem;
}

.u-order .bd {
	padding: 1.3rem 1.4rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.u-order .coin {
	width: 1.75rem;
	height: 1.9375rem;
}

.u-order .bd .detail {
	display: flex;
	flex-direction: column;
}
.user .name {
	font-size: .75rem;
	color: #333;
}
.user .address,
.dt {
	color: #949494;
	font-size: .75rem;
}
.u-order .bd .detail .desc {
	font-size: .875rem;
	color: #5e5e5e;
	margin-top: -.2rem;
}

.u-order .bd .detail .value {
	font-size: .875rem;
	color: #199ed8;
	margin-top: .2rem;
}

.u-order .bd .value {
	color: #FFAA42;
	font-size: 1.125rem;
}

.u-order .bd .buy-btn,
.u-order .bd .value {
	display: flex;
	align-items: center;
	
}

.u-order .bd .buy-btn {
	height: 1.5rem;
	color: #32aafa;
	font-size: .75rem;
	border: 1px solid #32aafa;
	padding: 0 .8rem;
	border-radius: .75rem;
}

.add-height {
	height: .1rem;
}

.pop-btn {
	height: 45%;
	width: 100%;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #199ED8;
	font-size: 1.125rem;
}

</style>
