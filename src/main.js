import './assets/tailwind.css'  // ✅ 先載入 Tailwind（只含 utilities）
import './assets/init.css'
import './assets/login.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'

import { showModal, errorMessage ,openModalWithErrorMessage, closeModal } from '@/apis/utils';

const app = createApp(App)

app.provide('globalFunctions', {
  showModal,
  errorMessage,
  openModalWithErrorMessage,
  closeModal,
});

app.use(router)
app.use(createPinia())
app.use(Antd)
app.mount('#app')
