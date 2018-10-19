module.exports = {
  key: 'MonitoringPortal',
  serverUrl: 'http://localhost:3000/',
  clientUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'http://localhost:3000/'
}
