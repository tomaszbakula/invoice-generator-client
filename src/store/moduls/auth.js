import router from '@/router'
import axios from 'axios'
import { LOGIN_URL, SIGNUP_URL } from '@/config'

const state = {
  user: {
    profile: {},
    authenticated: false,
    authErrors: ''
  }
}

const getters = {
  isAuthenticated (state) {
    return state.user.authenticated
  },
  getAuthErrors (state) {
    return state.user.authErrors
  },
  userProfile (state) {
    return state.user.profile
  },
  authToken () {
    return 'Bearer ' + localStorage.getItem('token')
  }
}

const mutations = {
  checkAuth (state) {
    var token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    if (token) {
      state.user.authenticated = true
    } else {
      state.user.authenticated = false
      state.user.profile = {}
    }
  },
  logout (state) {
    localStorage.removeItem('token')
    state.user.authenticated = false
    axios.defaults.headers.common['Authorization'] = ''
    router.push('/')
  },
  setAuthErrors (state, errors) {
    state.user.authErrors = errors
  },
  setAuth (state, status) {
    state.user.authenticated = status
  }
}

const actions = {
  login ({ state, commit }, credentials) {
    axios.post(LOGIN_URL, credentials)
    .then(function (response) {
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

      commit('setAuth', true)
      router.push('/invoices')
    })
    .catch(function (err) {
      if (err.response) {
        commit('setAuthErrors', err.response.data)
      }
    })
  },
  signup ({ commit, state }, credentials) {
    axios.post(SIGNUP_URL, credentials)
    .then(response => {
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

      commit('setAuth', true)
      router.push('/invoices')
    })
    .catch(err => {
      if (err.response) {
        commit('setAuthErrors', err.response.data)
      }
    })
  }
}

export default { state, getters, mutations, actions }
