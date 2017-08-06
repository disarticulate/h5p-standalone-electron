import Vue from 'vue'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import router from './router'
import store from './store'

const ipcRenderer = require('electron').ipcRenderer

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Element)

// export global window object H5P as all plugins use it directly
window.H5P = window.H5P || {}

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  data () {
    return {
      ipc: ipcRenderer,
      H5P: window.H5P
    }
  },
  template: '<App/>'
}).$mount('#app')
