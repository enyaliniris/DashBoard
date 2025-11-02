// stores/auth.ts
import { defineStore } from 'pinia'

interface User {
  username: string
  roles: string[]
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    hasRole: (state) => (role: string) => state.user?.roles.includes(role) ?? false,
  },
  actions: {
    setToken(token: string) { this.token = token },
    setUser(user: User) { this.user = user },
    logout() {
      this.token = ''
      this.user = null
    },
  },
})
