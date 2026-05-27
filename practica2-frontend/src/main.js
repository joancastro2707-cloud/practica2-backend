import './plugins/axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Asegúrate de que incluya el prefijo /api
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.withCredentials = true
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')