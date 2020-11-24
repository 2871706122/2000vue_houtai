import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

var echarts = require('echarts');
import axios from 'axios'
axios.defaults.baseURL = "http://rpmaster.dili.pub/redpoint/"

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

Vue.prototype.$bus = new Vue();

import { Message } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { locale })
Vue.use(ElementUI);


//请求拦截 首先对拦截器的请求进行设置，并在方法中return config，此处为固定格式
axios.interceptors.request.use(config => {
  // 表示在配置中的设置头消息的字段Authorization为从本地获取的token值
  let code = localStorage.getItem("code")
  if(code && window.location.href.indexOf("/login") < 0){
    config.headers.Authorization = code
  }
  return config
})

//相应拦截
axios.interceptors.response.use(function (response) {
  // 在接收响应做些什么，例如跳转到登录页
  //console.log(response);
  if(response.data.message.indexOf("Token无效") >= 0){
    if(window.location.href.indexOf("login") < 0){//不在登录界面
      //Message.error(response.data.message)
      router.push("/login")
    }
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
