import Vue from 'vue'
import { Progress, Tooltip } from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.component(Progress.name, Progress)
Vue.component(Tooltip.name, Tooltip)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
