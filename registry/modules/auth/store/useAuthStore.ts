import { JWT_STORE_KEY } from '@registry/shared/config/config'
// modules/auth/store/useAuthStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@registry/modules/auth/types/user.type'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem(JWT_STORE_KEY))

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const setToken = (newToken: string) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem(JWT_STORE_KEY, newToken)
    } else {
      localStorage.removeItem(JWT_STORE_KEY)
    }
  }

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const clearToken = () => {
    token.value = null
    localStorage.removeItem(JWT_STORE_KEY)
  }

  const clearUser = () => user.value = null

  const logout = () => {
    clearToken()
    clearUser()
  }

  return {
    user,
    token,
    isAuthenticated,
    setToken,
    clearToken,
    setUser,
    clearUser,
    logout,
  }
})
