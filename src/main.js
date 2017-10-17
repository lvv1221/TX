// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import utils from './utils'
import './assets/css/main.css'
import './assets/css/common/fonts/iconfont.css'
import {test} from './utils/test'
import config from './assets/config/env-config.json'
import echarts from 'echarts'
import j0Service from './api/services/j0service'


Vue.config.productionTip = false

Vue.use(test)
Vue.prototype.UTILS = utils
Vue.prototype.CONFIG = config
Vue.prototype.$echarts = echarts
Vue.prototype.j0Service = j0Service
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: h => h(App),
  components: { App }
})
