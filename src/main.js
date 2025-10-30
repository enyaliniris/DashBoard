import './assets/init.css'
import './assets/login.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import { showModal, errorMessage ,openModalWithErrorMessage, closeModal } from './apis/utils.js';
import { createPinia } from 'pinia'
const pinia = createPinia()




app.provide('globalFunctions', {
    showModal,
    errorMessage,
    openModalWithErrorMessage,
    closeModal,
  });

app.use(router)
app.use(pinia)

app.mount('#app')
