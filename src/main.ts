import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'
import axios from 'axios'


  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')

axios.defaults.baseURL = import.meta.env.VITE_API_URL