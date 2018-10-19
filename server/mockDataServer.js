const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.get('/newdata', function (req, res) {
  const data = generateData()
  res.send(data)
})

module.exports = app

const locations = ['bedroom', 'kitchen', 'livingroom', 'bathroom', 'toilet', 'backyard', 'unknown area']
const activities = ['is entering', 'has entered', 'is in']

function generateData () {
  let arr = []

  for (let index = 0; index < 10; ++index) {
    let ranPatientNum = Math.floor(Math.random() * 10)
    let mockPatientData = {patientid: ('Patient' + ranPatientNum), location: locations[Math.floor(Math.random() * locations.length)], activity: activities[Math.floor(Math.random() * activities.length)], time: (Date.now() + index)}
    arr.push(mockPatientData)
  }
  return arr
}
