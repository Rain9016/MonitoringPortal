const axios = require('axios')

const retriveDataFromExternalDataSource = function () {
  return axios.get('http://localhost:3001/newdata')
}

module.exports = {
  retriveDataFromExternalDataSource: retriveDataFromExternalDataSource
}
