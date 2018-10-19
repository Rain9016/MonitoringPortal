import axios from 'axios'
import config from '../config/vueConfig'
const serverURL = config.clientUrl
// const serverURL = 'http://localhost:8080/'

export const userService = {
  login,
  logout,
  register
}

function login (userinfo) {
  const url = serverURL + 'api/login'
  return axios.post(url, {data: userinfo})
}

function logout (userinfo) {
  // remove user from local storage to log user out
  sessionStorage.removeItem('userinfo')
  sessionStorage.removeItem('token')
  const url = serverURL + 'api/logout'
  return axios.post(url, {data: userinfo})
}

function register (userinfo) {
  const url = serverURL + 'api/register'
  return axios.post(url, {data: userinfo})
}
