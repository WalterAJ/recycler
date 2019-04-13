import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import '@/assets/css/normal.css'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
import 'vue-ydui/dist/ydui.base.css';
Vue.use(ElementUI)
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
