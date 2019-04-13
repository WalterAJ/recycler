<template>
	<div class="personal">
		<my-header title="帮助"></my-header>
  	<div class="person-content" ref='bd'>
			
			<div class="personal-option">
				<router-link to='/wallet'>
				<div class="list">
					<div class="left">
						<span>账号管理</span>
					</div>
					<div class="right">
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				</router-link>
				
				<div class="list">
					<div class="left">
						
						<span>绑定手机</span>
					</div>
					<div class="right">
						
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				<div class="list" style="border-top:7px solid #f2f2f2;">
					<div class="left">
					
						
						<span>支付设置</span>
					</div>
					<div class="right">
						
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				<div class="list">
					<div class="left">
					
						<span>安全中心</span>
					</div>
					<div class="right">
						
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				<div class="list">
					<div class="left">
			
						<span>通用</span>
					</div>
					<div class="right">
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
				<div class="list">
					<div class="left">
			
						<span>关于点滴回收</span>
					</div>
					<div class="right">
						<img src="/static/icons/rightArrow.png" alt="arrow" class='arrow'>
					</div>
				</div>
			</div>
			<div ref='fillPg' class='fill-pg'></div>
    </div>
	

</div>
</template>
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
.personal-option{
    margin-top: 8px;
    background-color: #FFF;
}
.personal-function .title {
	color: #333;
	font-size: .75rem;
	margin-top: .6rem;
}
.wp .value {
	color: #FFAA42;
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
	padding: .5rem 1rem;
	border-bottom: 1px solid #f2f2f2;
}

.list .left {
	display: flex;
	align-items: center;
	color: #333;
	font-size: .875rem;
}

.list .right {
	display: flex;
	align-items: center;
	color: rgb(153, 153, 153);
	font-size: .75rem;
}

.list .left img {
	margin-right: .8rem;
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

</style>
<script>
import MyFooter from '@/components/MyFooter'
import MyHeader from "@/components/MyHeader";
export default {
	mounted() {
		const nickname = window.localStorage.getItem('nickname')
		const avatarurl = window.localStorage.getItem('avatarurl')
		if (nickname != undefined && nickname != null) {
			this.$refs.avatar.src=avatarurl
			this.$refs.nickname.innerHTML = nickname
			this.$refs.nickname.style.border='0px solid transparent'
		}
		const bd = this.$refs.bd
		const topCtn = this.$refs.topCtn
		const fillBox = this.$refs.fillPg
		const ft = this.$refs.gFt
		let marginTop = bd.getBoundingClientRect().bottom - topCtn.getBoundingClientRect().height + 'px'
		let height = Math.abs(bd.getBoundingClientRect().bottom - ft.getBoundingClientRect().top) + 'px'
		fillBox.style.height = height
		// fillBox.style.marginTop = marginTop
	},
	components: {
        MyFooter,
        MyHeader
	},
  data() {
    return {
			switch1: true,
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
  methods: {}
};
</script>


