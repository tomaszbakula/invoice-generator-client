import router from '@/router'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'authenticate/'
const SIGNUP_URL = API_URL + 'users/'

const state = {
  user: {
    profile: {},
    authenticated: false,
    authErrors: {}
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
      state.user.profile = jwtDecode(token)
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
  }
}

const actions = {
  login ({ state, commit }, credentials) {
    axios.post(LOGIN_URL, credentials)
    .then(function (response) {
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token

      // NOTE #1: I'm not sure about this solution.
      // Maybe I should use mutations to update the state.
      state.user.authenticated = true

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
      state.user.authenticated = true

      router.push('dashboard')
    }).error((err) => {
      state.errors = err.response.data
    })
  }
}

export default { state, getters, mutations, actions }
