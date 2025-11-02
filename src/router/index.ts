// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Loginpage.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全域路由守衛
router.beforeEach((to, from, next) => {
  const auth = useAuthStore() // 從 Pinia 取得 Auth 狀態

  // 進入根路由時自動判斷
  if (to.path === '/') {
    if (auth.isLoggedIn) {
      next('/dashboard')
    } else {
      next('/login')
    }
    return
  }

  // 1️.如果該頁需要登入，但使用者未登入
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    console.log('loginfailA')
    next('/login')
    return
  }

  // 2️.如果該頁有設定 roles，但使用者角色不符
  const roles = to.meta.roles as string[] | undefined
  if (roles && !roles.some((role) => auth.hasRole(role))) {
    console.log('loginfailB')
    next('/403')
    return
  }

  // 3️.其他情況直接放行
  next()
})

export default router
