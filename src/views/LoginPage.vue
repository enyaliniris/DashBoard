<template>
  <section class="login">
    <div class="login-container">
      <div class="circle"></div>
      <div class="login-title">歡迎登入 數據庫</div>
      <div class="f-title">頁面展示，帳號密碼隨意輸入</div>

      <a-form
        :model="form"
        :rules="rules"
        ref="loginFormRef"
        layout="vertical"
      >
        <a-form-item label="使用者ID" name="id">
          <a-input
            v-model:value="form.id"
            placeholder="請輸入使用者ID"
          />
        </a-form-item>

        <a-form-item label="密碼" name="password">
          <a-input-password
            v-model:value="form.password"
            placeholder="請輸入密碼"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" block @click="login">登入</a-button>
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

// 按需引入 Ant Design Vue 元件
import { Form, Input, Button } from 'ant-design-vue'

const auth = useAuthStore()
const router = useRouter()

const loginFormRef = ref<FormInstance | null>(null)

const form = ref({
  id: '',
  password: ''
})

// 即時驗證規則
const rules = ref({
  id: [{ required: true, message: '請輸入使用者ID', trigger: 'blur' }],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' }
  ]
})

function login() {
  loginFormRef.value?.validate().then((valid) => {
    if (valid) {
      auth.setToken('dummy-token')
      auth.setUser({
        username: form.value.id || 'DemoUser',
        roles: ['user']
      })
      redirectToBoard()
    }
  }).catch(() => {
    console.log('表單驗證失敗')
  })
}

function redirectToBoard() {
  if (auth.isLoggedIn) {
    console.log('go to dash board')
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
@keyframes jumbo {
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}
.jumbo {
  --stripes: repeating-linear-gradient(
    100deg,
    #fff 0%,
    #fff 7%,
    transparent 10%,
    transparent 12%,
    #fff 16%
  );
  --stripesDark: repeating-linear-gradient(
    100deg,
    #000 0%,
    #000 7%,
    transparent 10%,
    transparent 12%,
    #000 16%
  );
  --rainbow: repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #e879f9 15%,
    #60a5fa 20%,
    #5eead4 25%,
    #60a5fa 30%
  );
  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  filter: blur(30px) invert(100%);
  mask-image: radial-gradient(ellipse at 100% 0%, rgb(255, 255, 255) 40%, transparent 70%);
  pointer-events: none;
}
.jumbo::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  animation: jumbo 60s linear infinite;
  background-attachment: fixed;
  mix-blend-mode: difference;
}
.dark .jumbo {
  background-image: var(--stripesDark), var(--rainbow);
  filter: blur(10px) opacity(50%) saturate(200%);
}
.dark .jumbo::after {
  background-image: var(--stripesDark), var(--rainbow);
}
</style>
