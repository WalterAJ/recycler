<template>
<div class="g-stations">
	<div class="tab-wrapper" ref='tabWrapper'>
		<el-tabs v-model="activeTab">
			<el-tab-pane label="综合排序" name="first"></el-tab-pane>
			<el-tab-pane label="收益最高" name="price"></el-tab-pane>
			<el-tab-pane label="离我最近" name="distance"></el-tab-pane>
			<el-tab-pane label="好评优先" name="star"></el-tab-pane>
		</el-tabs>
	</div>
	<div class="g-bd" ref='gBd'>
		<div class="u-station-wrapper" v-for='item in stations' :key="item.station">
			<station :station = item></station>
		</div>
	</div>
	<div class="g-ft" ref='gFt'>
		<my-footer></my-footer>
	</div>
</div>
	
</template>
<script>
import "./css/main.css";
import station from "./components/station";
import MyFooter from '@/components/MyFooter'
import MyHeader from "@/components/MyHeader";
import axios from 'axios'
export default {
  mounted() {
		const body = document.getElementsByTagName("body")[0];
		const tabWrapper = this.$refs.tabWrapper
		const gBd = this.$refs.gBd
		const gFt = this.$refs.gFt
		const html = document.getElementsByTagName("html")[0];
		let htmlUnitFontSize = window.getComputedStyle(html, null).getPropertyValue("font-size");
    htmlUnitFontSize = parseFloat(htmlUnitFontSize)
		gBd.style.height = `${gBd.clientHeight + gFt.clientHeight + 2 * htmlUnitFontSize}px`
		body.style.overflowY = "scroll";
		 axios.get("/api/recycler/userInfo/getStations")
		 .then(res =>{
			 this.stations = res.data;
		 })
	},
	methods:{
		sort(key){//排序
			let arr = this.stations
			for(let i=0;i<arr.length-1;i++){
        for(let j=0;j<arr.length-1-i;j++){
            if(arr[j][key]>arr[j+1][key]){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
		}
		if(key = 'star'){arr = arr.reverse()}//如果是星级就倒叙
    return arr;
		}
	},
  components: {
		station,
		MyFooter,
		MyHeader
  },
  data() {
    return {
			activeTab: "first",
			stations:[]
    };
	},
	watch : {
   'activeTab':function(val) { //监听切换状态-排序
        this.sort(val);
        
   },
	}
};
</script>
<style scoped>
.tab-wrapper {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
}
.g-bd {
	margin-top: 54px;
}
.g-ft {
	position: fixed;
	height: 48px;
	width: 100%;
	bottom: 0;
	left: 0;
	background: #fff;
}
.u-station-wrapper {
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  margin-top: 1rem;
}
.u-station-wrapper:nth-child(1) {
  margin-top: 0;
}
</style>
