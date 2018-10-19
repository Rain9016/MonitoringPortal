var crypto = require('crypto')

module.exports = {
  decrypt (str) {
    var decipher = crypto.createDecipher('aes128', 'MonitoringPortal')
    var decrypted = decipher.update(str, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')
    return decrypted
  },
  isAccount: function (account) {
    if (!account) return false
    return /^[a-zA-Z][a-zA-Z0-9_]{5,13}$/.test(account)
  }
}
