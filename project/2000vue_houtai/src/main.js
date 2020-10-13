import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

var echarts = require('echarts');
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
