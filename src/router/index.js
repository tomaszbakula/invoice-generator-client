import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Invoices from '@/components/Invoices'

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
        store.getters.isAuthenticated ? next('/dashboard') : next()
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
      beforeEnter: auth
    },
    {
      path: '/profile',
      component: Profile,
      beforeEnter: auth
    },
    {
      path: '/invoices',
      component: Invoices,
      beforeEnter: auth
    }
  ]
})

function auth (to, from, next) {
  store.getters.isAuthenticated ? next() : next('/login')
}
