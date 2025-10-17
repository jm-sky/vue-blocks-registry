// modules/auth/store/useAuthStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types/user'
import { JWT_STORE_KEY } from '@registry/shared/config/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem(JWT_STORE_KEY))

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  function setToken(newToken: string | null) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem(JWT_STORE_KEY, newToken)
    } else {
      localStorage.removeItem(JWT_STORE_KEY)
    }
  }

  function setUser(newUser: User | null) {
    user.value = newUser
  }

  function logout() {
    setToken(null)
    setUser(null)
  }

  return {
    user,
    token,
    isAuthenticated,
    setToken,
    setUser,
    logout,
  }
})
