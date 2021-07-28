import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/style/index.scss'
import appUI from './components'


Vue.config.productionTip = false

Vue.use(appUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
