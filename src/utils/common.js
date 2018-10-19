// const adminTokenKey = 'Admin-Token'
var crypto = require('crypto')
const config = require('@/config/vueConfig')

export default {
  isInt: function (num) {
    if (typeof num !== 'number') return false
    return /^[0-9]+$/.test(num)
  },
  telphone: function (num) {
    return /^((\+?[0-9]{1,4})|(\(\+86\)))?(1[0-9])\d{9}$/.test(num)
  },
  isEmail: function (str) {
    if (!this.isString(str)) return false
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(str)
  },
  maxLength: function (str, len = 140) {
    if (!this.isString(str)) return false
    if (str.length >= ~~len) return false
    return true
  },
  minLength: function (str, len = 1) {
    if (!this.isString(str)) return false
    if (str.length < ~~len) return false
    return true
  },
  isMoney: function (num) {
    if (!num) return false
    return /^[0-9]+(.[0-9]{1,2})?$/.test(num)
  },
  isZeroOrNum: function (num) {
    if (!num) return false
    return /^(0|[1-9][0-9]*)$/.test(num)
  },
  isFloatNum: function (num) {
    if (!num) return false
    return /^(-?\d+)(\.\d+)?$/.test(num)
  },
  isID: function (num) {
    if (!num) return false
    return /^\d{15}|\d{18}$/.test(num)
  },
  isAccount: function (account) {
    if (!account) return false
    return /^[a-zA-Z][a-zA-Z0-9_]{5,13}$/.test(account)
  },
  isName: function (str) {
    if (!str) return false
    return /^[\u4e00-\u9fa5]{0,}$/.test(str)
  },
  isString: function (str) {
    if (typeof str !== 'string') return false
    if (str.trim().length < 1) return false
    return true
  },
  encrypt (str) {
    var cipher = crypto.createCipher('aes128', config.key)
    var crypted = cipher.update(str, 'utf-8', 'hex')
    crypted += cipher.final('hex')
    return crypted
  }
}
