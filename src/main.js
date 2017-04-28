// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from './store'
import router from './router'
import Materials from 'vue-materials'

Vue.config.productionTip = false

Vue.use(Materials)

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
