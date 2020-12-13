import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import '@vuelog/front';
import vuelog from './vuelog'

Vue.config.productionTip = false

new Vue({
  router,
  vuelog,
  store,
  render: h => h(App)
}).$mount('#app')
