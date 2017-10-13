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

Vue.config.productionTip = false

Vue.use(test)
Vue.prototype.UTILS = utils
Vue.prototype.CONFIG = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: h => h(App),
  components: { App }
})
