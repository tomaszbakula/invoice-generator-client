import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Invoices from '@/components/Invoices'
import InvoiceCreate from '@/components/InvoiceCreate'
import InvoiceEdit from '@/components/InvoiceEdit'

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
      path: '/profile',
      component: Profile,
      beforeEnter: auth
    },
    {
      path: '/invoices',
      component: Invoices,
      beforeEnter: auth
    },
    {
      path: '/invoices/create',
      component: InvoiceCreate,
      beforeEnter: auth
    },
    {
      path: '/invoices/:id',
      component: InvoiceEdit,
      beforeEnter: auth
    }
  ]
})

function auth (to, from, next) {
  store.getters.isAuthenticated ? next() : next('/login')
}
