const schedule = require('node-schedule')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const externalDataInterface = require('./server/api/externalapi')
const userapi = require('./server/router/user')
const mockApp = require('./server/mockDataServer')
const socketConfig = require('./server/router/socket.js')
const app = express()
const server = require('http').Server(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// router for user login/register/logout
app.use(userapi)

app.get('/', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
// serves static files
app.use('/static', express.static(path.resolve(__dirname, './dist/static')))

// initialise socket server
const io = socketConfig.socketInit(server)

// run a corn job for pulling data from external data server by each second
const job = schedule.scheduleJob('* * * * * *', function () {
  externalDataInterface.retriveDataFromExternalDataSource().then(
    result => {
      let responseData = result.data
      // handling data from external data source
      socketConfig.distributeData(responseData)
    },
    err => {
      console.log(err)
    }
  )
})

server.listen(3000, function () {
  console.log('success listen…………')
})


// mockDataServer for simulating external data server
mockApp.listen(3001, function() {
  console.log('mockApp is running')
})

module.exports = app
