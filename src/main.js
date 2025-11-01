import './assets/init.css'
import './assets/login.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import { showModal, errorMessage ,openModalWithErrorMessage, closeModal } from './apis/utils.js';
// 引入Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
// 引入 Ant Design Vue
import Antd from 'ant-design-vue'



app.provide('globalFunctions', {
    showModal,
    errorMessage,
    openModalWithErrorMessage,
    closeModal,
  });

app.use(router)
app.use(pinia)
app.use(Antd) // 全域安裝 Ant Design Vue

app.mount('#app')
