// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

require('./filters')

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* Authenticate user */
store.commit('checkAuth')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
