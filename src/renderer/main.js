import Vue from 'vue'

import App from './App'
const ipcRenderer = window.require('electron').ipcRenderer
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
