<template>
  <section class="login">
    <div class="login-container">
      <div class="circle"></div>
      <div class="login-title">歡迎登入 數據庫</div>
      <div class="f-title mb-6">頁面展示，帳號密碼自訂</div>

      <a-form ref="loginFormRef" :model="form" :rules="rules" layout="vertical">
        <!-- 使用者ID -->
        <a-form-item label="使用者ID" name="id">
          <a-input v-model:value="form.id" placeholder="請輸入使用者ID" autocomplete="username" />
        </a-form-item>

        <!-- 密碼 -->
        <a-form-item label="密碼" name="password">
          <a-input-password v-model:value="form.password" placeholder="請輸入密碼" autocomplete="current-password" />
        </a-form-item>

        <!-- 角色 -->
        <a-form-item label="角色" name="role">
          <a-select v-model:value="form.role" placeholder="選擇角色">
            <a-select-option value="admin">Admin</a-select-option>
            <a-select-option value="guest">Guest</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <a-button class="!bg-sky-500 hover:!bg-sky-600 border-none text-white" block @click="login">
            登入
          </a-button>
        </a-form-item>

        <a-form-item>
          <a-button block type="link" @click="skipLogin">
            略過登入（{{ countdown }} 秒後自動登入）
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { FormInstance } from 'ant-design-vue'

const auth = useAuthStore()
const router = useRouter()
const countdown = ref(15)
let timer: number | null = null

const loginFormRef = ref<FormInstance>()

const form = ref({
  id: '',
  password: '',
  role: ''
})


const rules = {
  id: [
    {
      required: true,
      message: '請輸入使用者ID',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 20,
      message: '使用者ID長度需介於 6～20 字元',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: '使用者ID僅能包含英文字母與數字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '請輸入密碼',
      trigger: 'blur'
    },
    {
      min: 8,
      message: '密碼至少 8 個字元',
      trigger: 'blur'
    }
  ],
  role: [
    {
      required: true,
      message: '請選擇角色',
      trigger: 'change'
    }
  ]
}


async function login() {
  try {
    await loginFormRef.value?.validate()

    // Demo：成功後設定假 token
    auth.setToken('dummy-token')
    auth.setUser({
      username: form.value.id,
      roles: [form.value.role]
    })

    router.push('/dashboard')
  } catch {
    // 驗證失敗時不做任何事，錯誤由 Form 顯示
  }
}

function skipLogin() {
  clearTimer()

  auth.setToken('dummy-token')
  auth.setUser({
    username: 'demo-user',
    roles: ['guest']
  })

  router.push('/dashboard')
}

function startCountdown() {
  timer = window.setInterval(() => {
    countdown.value--

    if (countdown.value <= 0) {
      skipLogin()
    }
  }, 1000)
}

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  clearTimer()
})
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
