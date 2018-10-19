// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import toaster from '@/utils/toaster'
import {store} from './store'
import utils from '@/utils/common.js'

Vue.use(Vuex)
Vue.use(ElementUI, {size: 'medium', locale})
Vue.prototype.$toaster = toaster
Vue.prototype.$store = store
Vue.prototype.$utils = utils

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
