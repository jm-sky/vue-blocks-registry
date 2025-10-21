import { authService } from '@registry/modules/auth/services/authService'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import type { LoginCredentials, RegisterCredentials } from '@registry/modules/auth/types/user'

export function useAuth() {
  const authStore = useAuthStore()

  async function login(credentials: LoginCredentials) {
    const response = await authService.login(credentials)
    authStore.setToken(response.token)
    authStore.setUser(response.user)
  }

  async function register(credentials: RegisterCredentials) {
    const response = await authService.register(credentials)
    authStore.setToken(response.token)
    authStore.setUser(response.user)
  }

  async function fetchUser() {
    const user = await authService.getCurrentUser()
    authStore.setUser(user)
  }

  return {
    login,
    register,
    fetchUser,
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
  }
}
