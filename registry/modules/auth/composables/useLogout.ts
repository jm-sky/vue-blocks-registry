// modules/auth/composables/useLogout.ts
import { useAuthStore } from '../store/useAuthStore'
import { authService } from '../services/authService'
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
      router.push('/login')
    }
  }

  return {
    logout,
  }
}
