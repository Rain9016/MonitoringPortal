import Vue from 'vue'
export default {
  message: function (t, m, d, data, cb) {
    var options = {
      customClass: 'toaster toaster-success',
      title: t || 'Success',
      message: m || 'Request Success',
      duration: d || 1500,
      type: 'success',
      onClick: cb
    }
    Vue.prototype.$message.success(options)
  },
  error: function (t, m, d) {
    var options = {
      title: t || 'Error',
      message: `${t}  ${m || ''}` || 'Error message',
      duration: d || 2000,
      offset: 120,
      type: 'error',
      showClose: true
    }
    Vue.prototype.$message.error(options)
  },
  info: function (t, m, d) {
    var options = {
      title: t || 'Info',
      message: m || 'Info message',
      duration: d || 2000,
      type: 'info',
      showClose: true
    }
    Vue.prototype.$message.info(options)
  },
  warn: function (t, m, d) {
    var options = {
      // customClass: 'toaster toaster-warn',
      title: t || 'Warnning',
      message: t || 'Warnning message',
      duration: d || 2000,
      type: 'warning',
      showClose: true
    }
    Vue.prototype.$message.warning(options)
  },
  ok: function (t, m, d) {
    var options = {
      title: t || 'Success',
      message: t || 'Request Success',
      duration: d || 2000,
      type: 'success',
      showClose: true
    }
    Vue.prototype.$message.success(options)
  }
}
