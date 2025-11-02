<template>
  <section class="login">
    <div class="login-container">
      <div class="circle"></div>
      <div class="login-title">歡迎登入 數據庫</div>
      <div class="f-title mb-6">頁面展示，帳號密碼自訂</div>

      <a-form :model="form" :rules="rules" ref="loginFormRef" layout="vertical" :validate-trigger="['change', 'blur']">
        <!-- 使用者ID -->
        <a-form-item label="使用者ID" name="id" :validate-status="idStatus" :help="idHelp">
          <a-input v-model:value="form.id" placeholder="請輸入使用者ID" @input="validateIDInput" />
        </a-form-item>

        <!-- 密碼 -->
        <a-form-item label="密碼" name="password" :validate-status="passwordStatus" :help="passwordHelp">
          <a-input-password v-model:value="form.password" placeholder="請輸入密碼" @input="validatePasswordInput" />
        </a-form-item>

        <a-form-item>
          <a-button class="!bg-sky-500 hover:!bg-sky-600 border-none text-white" block @click="login">
            登入
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </section>

  <main class="bk">
    <div class="relative flex flex-col h-[100vh] items-center justify-center transition-bg">
      <div class="circle-mask"></div>
      <div class="absolute inset-0 overflow-hidden">
        <div class="jumbo absolute -inset-[10px] opacity-50"></div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { FormInstance } from 'ant-design-vue'


const auth = useAuthStore()
const router = useRouter()

const loginFormRef = ref<FormInstance | null>(null)
const rules = {
  id: [
    { required: true, message: '請輸入使用者ID', trigger: 'change' },
    { min: 3, message: '至少輸入 3 個字元', trigger: 'change' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'change' },
    { min: 6, message: '密碼至少 6 個字元', trigger: 'change' }
  ]
}

const form = ref({
  id: '',
  password: ''
})

// 即時驗證狀態
const idStatus = ref<'success' | 'error' | ''>('')
const passwordStatus = ref<'success' | 'error' | ''>('')

const idHelp = ref('')
const passwordHelp = ref('')

// 簡單驗證函式
function validateIDInput() {
  if (!form.value.id) {
    idStatus.value = 'error'
    idHelp.value = '請輸入使用者ID'
  } else if (form.value.id.length < 3) {
    idStatus.value = 'error'
    idHelp.value = '至少輸入 3 個字元'
  } else {
    idStatus.value = 'success'
    idHelp.value = ''
  }
}

function validatePasswordInput() {
  if (!form.value.password) {
    passwordStatus.value = 'error'
    passwordHelp.value = '請輸入密碼'
  } else if (form.value.password.length < 6) {
    passwordStatus.value = 'error'
    passwordHelp.value = '密碼至少 6 個字元'
  } else {
    passwordStatus.value = 'success'
    passwordHelp.value = ''
  }
}

function login() {
  // 先驗證即時訊息
  validateIDInput()
  validatePasswordInput()

  if (idStatus.value === 'success' && passwordStatus.value === 'success') {
    auth.setToken('dummy-token')
    auth.setUser({
      username: form.value.id || 'DemoUser',
      roles: ['user']
    })
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.login {
  z-index: 2;
}

.circle-mask {
  position: absolute;
  width: 1500px;
  height: 1500px;
  border-radius: 1500px;
  background-color: #d2e5f6;
  z-index: 1;
  top: 20%;
  left: 30%;
  transform: translate(-60%, -20%);
  filter: blur(50px);
  opacity: 0.8;
}

.bk {
  background-color: #d2e5f6 !important;
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}
</style>
