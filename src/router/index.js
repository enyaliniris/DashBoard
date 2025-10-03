

import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import LoginPage from '../views/LoginPage.vue'
import { ref, readonly } from 'vue'

let navOption = ref(1)
export const getNavOption = readonly(navOption)
let Auth = ref(false)
export const getAuth = Auth

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashBoard,
      meta: { requiresAuth: true } 
    },
    {
      path: '/login',     
      component: LoginPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  switch (to.path) {
    case '/':
      navOption.value = 1;
      break;
    case '/login':
      navOption.value = 2;
      break;
    default:
      console.log(`Sorry, we are out of ${to.path}.`);
  }
 
  if (to.meta.requiresAuth) {
    if (!Auth.value) { 
      next('/login'); 
      navOption.value = 2;
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

router.beforeResolve(async (to, from, next) => {
  if (to.path !== '/login' && !Auth.value) {
    next('/login');
  } else {
    next();
  }
});

export default router
