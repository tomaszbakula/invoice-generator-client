import router from '@/router'
import axios from 'axios'

const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'authenticate/'
const SIGNUP_URL = API_URL + 'users/'

const state = {
  authenticated: false,
  errors: {}
}

const getters = {
  isAuthenticated (state) {
    return state.authenticated
  },
  getAuthErrors (state) {
    return state.errors
  }
}

const mutations = {
  checkAuth (state) {
    if (localStorage.getItem('token')) {
      state.authenticated = true
    } else {
      state.authenticated = false
    }
  },
  logout (state) {
    localStorage.removeItem('token')
    state.authenticated = false
    router.push('/')
  }
}

const actions = {
  login ({ state, commit }, credentials) {
    axios.post(LOGIN_URL, credentials)
    .then(function (response) {
      localStorage.setItem('token', response.data.token)

      // NOTE #1: I'm not sure about this solution.
      // Maybe I should use mutations to update the state.
      state.authenticated = true

      router.push('dashboard')
    })
    .catch(function (err) {
      if (err.response) {
        state.errors = err.response.data
      }
    })
  },
  signup ({ commit, state }, credentials) {
    axios.post(SIGNUP_URL, credentials, (response) => {
      localStorage.setItem('token', response.data.token)

      // NOTE: Look note #1.
      state.authenticated = true

      router.push('dashboard')
    }).error((err) => {
      state.errors = err.response.data
    })
  }
}

export default { state, getters, mutations, actions }
