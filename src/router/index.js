import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        store.state.authenticated ? next('/dashboard') : next()
      }
    },
    {
      path: '/logout',
      component: Login,
      beforeEnter: (to, from, next) => {
        store.commit('logout')
      }
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        !store.state.authenticated ? next('/') : next()
      }
    }
  ]
})
