let io = null
const patientlist = {}
const jwt = require('../utils/jwt')
const users = require('../db/userdb')

function socketInit (server) {
  io = require('socket.io')(server)

  io.use(function (socket, next) {
    // Authentication check with assigned jwt
    if (socket.handshake.query && socket.handshake.query.token && socket.handshake.query.username) {
      let user = users.getUser({username: socket.handshake.query.username})
      if (!user) return next(new Error('Authentication error'))
      jwt.verifyToken(user, socket.handshake.query.token).then(
        result => {
          console.log('Authentication pass')
          next()
        },
        err => {
          console.log(err)
          return next(new Error('Authentication error'))
        }
      )
    } else {
      console.log('failed:' + socket.handshake.query)
      next(new Error('Authentication error'))
    }
  }).on('connection', function (socket) {
    console.log('socket connected')

    socket.on('subscribe', function (obj) {
      console.log(obj.username + ' subscribes ' + obj.patientid)
      socket.username = obj.username
      socket.patient = obj.patientid
      patientlist[obj.patientid][obj.username] = obj
      socket.join(obj.patientid)
      console.log(obj.username + ' subscribed ' + obj.patientid)
    })
    socket.on('unsubscribe', function (obj) {
      console.log(obj.username + 'unsubscribes ' + obj.patientid)
      try {
        const check = Object.hasOwnProperty.call(patientlist[obj.patientid], obj.username)
        if (check === true) {
          delete patientlist[obj.patientid][obj.username]
          socket.leave(obj.patientid)
          console.log(obj.username + 'unsubscribed ' + obj.patientid)
        }
      } catch (err) {
        console.log(err)
      }
    })
    socket.on('disconnect', function (e) {
      console.log('socket disconnected')
      if (patientlist[socket.patientid] && patientlist[socket.patientid].hasOwnProperty(socket.username)) {
        delete patientlist[socket.patientid][socket.username]
        socket.leave(socket.patientid)
      }
    })
    socket.on('patientlist', function (obj, cb) {
      console.log(obj)
      cb(getPatientList(obj))
    })
  })

  return io
}

// sending data to end users depending on subscription
function distributeData (data) {
  for (var index in data) {
    if (patientlist[data[index]['patientid']] === undefined) patientlist[data[index]['patientid']] = data[index]
    io.to(data[index]['patientid']).emit('message', data[index])
  }
}

function getPatientList (obj) {
  let data = {}
  for (let index in patientlist) {
    data[index] = false
    if (Object.hasOwnProperty.call(patientlist[index], obj.username)) data[index] = true
  }
  return data
}

module.exports.socketInit = socketInit
module.exports.distributeData = distributeData
// module.exports.io = io
// module.exports = {
//   socketInit: socketInit,
//   io: io
// }
