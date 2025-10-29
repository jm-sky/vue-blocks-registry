import { AuthRoutePaths } from '@registry/modules/auth/config/routes'
import { authService } from '@registry/modules/auth/services/authService'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import { useRouter } from 'vue-router'

export function useLogout() {
  const authStore = useAuthStore()
  const router = useRouter()

  async function logout() {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      authStore.logout()
      await router.push(AuthRoutePaths.login)
    }
  }

  return {
    logout,
  }
}
