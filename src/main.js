// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'assets/less/common.less'
import Vue from 'vue'
import App from './App'
import router from './router'
import useREM from 'assets/jsdev/rem.js'
import store from 'assets/jsdev/store.js'

Vue.config.productionTip = false

useREM.init()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
