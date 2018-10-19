const jwt = require('jsonwebtoken')
const secret = 'Monitoring&Portal'

const getSecretStr = function (user) {
  // console.log(user.username + '   ' + user.lastlogin)
  let secretStr = secret + '$' + user.username + '@' + user.lastlogin
  return secretStr
}

const getToken = function (user) {
  const currentSecret = getSecretStr(user)
  const payload = {
    username: user.username
  }
  const token = jwt.sign(payload, currentSecret, { expiresIn: '4hour' })
  return token
}

const verifyToken = function (user, token) {
  return new Promise(function (resolve, reject) {
    let currentSecret = getSecretStr(user)
    jwt.verify(token, currentSecret, (error, decoded) => {
      if (error) {
        reject(error)
      }
      resolve(true)
    })
  })
}

module.exports.getToken = getToken
module.exports.verifyToken = verifyToken
