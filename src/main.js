import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const ipcRenderer = window.require('electron').ipcRenderer

Vue.config.productionTip = false

Vue.prototype.$ipcRenderer = ipcRenderer

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
