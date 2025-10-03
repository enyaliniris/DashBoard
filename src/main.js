import './assets/init.css'
import './assets/login.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import { showModal, errorMessage ,openModalWithErrorMessage, closeModal } from './apis/utils.js';




app.provide('globalFunctions', {
    showModal,
    errorMessage,
    openModalWithErrorMessage,
    closeModal,
  });

app.use(router)

app.mount('#app')
