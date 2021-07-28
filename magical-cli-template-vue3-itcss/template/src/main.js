import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/style/index.scss'
import appUI from './components'

createApp(App).use(store).use(router).use(appUI).mount('#app')
