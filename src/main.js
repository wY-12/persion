import Vue from 'vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import App from './App.vue'
import router from './router'
import store from './store'
import myMessage from './components/myMessage.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as echarts from "echarts";
import Axios from 'axios';

Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(mavonEditor)

Vue.prototype.$myMessage = myMessage.install
Vue.prototype.$echarts = echarts;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
