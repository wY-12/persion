import Vue from 'vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import App from './App.vue'
import router from './router'
import store from './store'
import { Loading } from 'element-ui';
import myMessage from './components/myMessage.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from "echarts";
import Axios from 'axios';
Vue.prototype.$myMessage = myMessage.install
Vue.prototype.$echarts = echarts;
let LdRPC = {
  bindEvent: function (axiosObject, onSuccess, onFailed, noMsg = false) {
    axiosObject
      .then(function (response) {
        if (onSuccess) {
          if (response.data.status && response.data.status === 'fail') {
            if (response.data.data.errno === 401) {
              !noMsg && Vue.prototype.$Message.error(response.data.data.description);
              // setTimeout(() => {
              //     window.location.href = response.data.data.redirect_url;
              // }, 1000);
            }
            if (response.data.data.errno === 403) {
              !noMsg && Vue.prototype.$Message.error({
                duration: 5,
                content: response.data.data.description
              });
              return false;
            }
          }
          onSuccess(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status == 403) {
          !noMsg && Vue.prototype.$Message.error('没有权限访问!');

        } else {
          if (onFailed) {
            onFailed(error.response);
          }
        }
      });
  },
  get: function (url, data = {}, onSuccess = null, onFailed = null, noMsg = false) {
    let requestUrl =url.trim();
      requestUrl =process.env.VUE_APP_API_URL+requestUrl
    var axiosObject = Axios.get(requestUrl, data);
    LdRPC.bindEvent(axiosObject, onSuccess, onFailed, noMsg);
  },
  post: function (url, data = {}, onSuccess = null, onFailed = null, noMsg = false) {
    let requestUrl=url.trim();
      requestUrl =process.env.VUE_APP_API_URL+requestUrl
    var axiosObject = Axios.post(requestUrl, data);
    LdRPC.bindEvent(axiosObject, onSuccess, onFailed, noMsg);
  }
};
Vue.prototype.$myLoading = function(){
  const loading = Loading.service({
    lock: true,
    text:'请等待',
    spinner: 'el-icon-loading'
  }) 
  return loading
}
Vue.prototype.$axios = LdRPC
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(mavonEditor)




new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
