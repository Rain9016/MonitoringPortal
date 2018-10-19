const express = require('express')
const router = express.Router()
const utils = require('../utils/utils.js')
const jwt = require('../utils/jwt.js')
const users = require('../db/userdb')

router.route('/api/login').post(async (req, res) => {
  let userInfo = req.body.data
  if (!userInfo) {
    let err = {message: 'Bad Request'}
    res.status(400).send(err)
    return
  }
  let user = users.getUser(userInfo)
  if (user === undefined) {
    let data = {message: 'username not exist'}
    res.send(data)
    return
  }
  try {
    if (user.password !== utils.decrypt(userInfo.password)) {
      let err = {
        message: 'Invalid username or password'
      }
      res.send(err)
      return
    }
  } catch (error) {
    res.status(400).send({message: 'Bad Request'})
    return
  }


  // update login timestamp for generating jwt
  user.lastlogin = Date.now()
  users.updateUser(user)
  const token = await jwt.getToken(user)
  res.header('token', token)
  let data = {
    message: 'Login Success',
    userinfo: {username: userInfo.username}
  }
  res.send(data)
})

router.route('/api/logout').post(async (req, res) => {
  let userInfo = req.body.data
  if (!userInfo) {
    let err = {message: 'Bad Request'}
    res.status(400).send(err)
    return
  }
  let user = users.getUser(userInfo)
  if (user === undefined) {
    let data = {message: 'username not exist'}
    res.send(data)
    return
  }

  // update login timestamp for disabling jwt
  user.lastlogin = Date.now()
  users.updateUser(user)
  let data = {
    message: 'Logout Successfully',
    username: userInfo.username
  }
  res.send(data)
})

router.route('/api/register').post(async (req, res) => {
  let userinfo = req.body.data
  if (!userinfo) {
    let err = {message: 'Bad Request'}
    res.status(400).send(err)
    return
  }
  if (users.getUser(userinfo.username) !== undefined) {
    let data = {message: 'username already exists'}
    res.send(data)
    return
  }
  let user = null
  try {
    user = {
      username: userinfo.username,
      password: utils.decrypt(userinfo.password),
      lastlogin: Date.now()
    }
  } catch (error) {
    res.status(400).send({message: 'Bad Request'})
    return
  }


  if (users.addUser(user) === true) {
    let data = {
      userinfo: userinfo.username,
      message: 'Register success'
    }
    res.send(data)
  } else {
    let data = {message: 'username already exists'}
    res.send(data)
  }
})

module.exports = router
