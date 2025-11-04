import { AuthRoutePaths } from '@registry/modules/auth/config/routes'
import { authService } from '@registry/modules/auth/services/authService'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import { useRouter } from 'vue-router'
import type { IAuthService } from '@registry/modules/auth/types/auth.type'

export function useLogout(service?: IAuthService) {
  const authStore = useAuthStore()
  const router = useRouter()

  async function logout() {
    try {
      await (service ?? authService).logout()
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
