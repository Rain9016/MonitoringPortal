import { userService } from '@/api/userService.js'
import utils from '@/utils/common.js'

const userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
const state = userinfo ? {status: {loggedIn: true}, userinfo} : {status: {}, userinfo: null}

const actions = {
  login ({dispatch, commit}, { username, password }) {
    commit('loginRequest', { username })
    return new Promise((resolve, reject) => {
      userService.login({username: username, password: utils.encrypt(password)})
        .then(
          result => {
            // login not success
            if (!result.data.userinfo) {
              reject(result.data.message)
              return
            }
            commit('loginSuccess', result.data.userinfo)
            // store user data if successfully login
            sessionStorage.setItem('userinfo', JSON.stringify(result.data.userinfo))
            sessionStorage.setItem('token', result.headers.token)
            resolve(result.data.message)
          },
          error => {
            // handling 400 response
            commit('loginFailure', error)
            console.log(error)
            reject(error)
          }
        )
    })
  },
  logout ({commit}) {
    let userinfo = state.userinfo
    userService.logout(userinfo)
    commit('logout')
  },
  register ({dispatch, commit}, {username, password}) {
    commit('registerRequest', {username: username, password: utils.encrypt(password)})
    return new Promise((resolve, reject) => {
      userService.register({username: username, password: utils.encrypt(password)})
        .then(
          result => {
            if (!result.data.userinfo) {
              console.log(result.data)
              reject(result.data.message)
              return
            }
            commit('registerSuccess', {})
            resolve(result.data.message)
          },
          error => {
            commit('registerFailure', error)
            console.log(error)
            reject(error)
          }
        )
    })
  }
}

const getters = {
  getUser (state) {
    return state.user
  },
  getStatus (state) {
    return state.status
  }
}

const mutations = {
  loginRequest (state, userinfo) {
    state.status = {
      loggingIn: true
    }
    state.userinfo = userinfo
  },
  loginSuccess (state, userinfo) {
    state.status = {
      loggedIn: true
    }
    state.userinfo = userinfo
  },
  loginFailure (state) {
    state.status = {}
    state.userinfo = null
  },
  logout (state) {
    state.status = {}
    state.userinfo = null
  },
  registerRequest (state, userinfo) {
    state.status = {
      registering: true
    }
  },
  registerSuccess (state, userinfo) {
    state.status = {}
  },
  registerFailure (state, error) {
    state.status = {}
  }
}

// function userDataProcess (userinfo) {
//   const jsonObject = {
//     username: userinfo.username,
//     password: userinfo.password
//   }
//   if (userinfo.password !== undefined)jsonObject.password = utils.encrypt(userinfo.password)
//   return jsonObject
// }

export const user = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
