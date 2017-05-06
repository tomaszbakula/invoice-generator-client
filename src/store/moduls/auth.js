import router from '@/router'
import axios from 'axios'

const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'auth'
const SIGNUP_URL = API_URL + 'users'

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

      // TODO: Check if it works.
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token

      commit('setAuth', true)
      router.push('dashboard')
    })
    .catch(function (err) {
      if (err.response) {
        commit('setAuthErrors', err.response.data)
      }
    })
  },
  signup ({ commit, state }, credentials) {
    axios.post(SIGNUP_URL, credentials, (response) => {
      localStorage.setItem('token', response.data.token)
      commit('setAuth', true)
      router.push('dashboard')
    }).error((err) => {
      if (err.response) {
        commit('setAuthErrors', err.response.data)
      }
    })
  }
}

export default { state, getters, mutations, actions }
