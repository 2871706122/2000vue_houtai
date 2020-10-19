import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

var echarts = require('echarts');
import axios from 'axios'
axios.defaults.baseURL = "http://red.zudo.pw:8080/redpoint/"

// 首先对拦截器的请求进行设置，并在方法中return config，此处为固定格式
axios.interceptors.request.use(config => {
  // 表示在配置中的设置头消息的字段Authorization为从本地获取的token值
  let code = localStorage.getItem("code")
  if(code && window.location.href.indexOf("/login") < 0){
    config.headers.Authorization = code
  }
  return config
})

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

Vue.prototype.$bus = new Vue();

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { locale })
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
