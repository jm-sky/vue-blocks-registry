import { useRouter } from 'vue-router'
import { RoutePaths } from '@/router/route-names'
import { useLogin } from '@registry/modules/auth/composables/useAuth'
import { mockAuthService } from '@registry/modules/auth/services/mockAuthService'
import { useTenantRedirect } from './useTenantRedirect'

export const useAutoLogin = () => {
  const router = useRouter()
  const { checkTenantAndRedirect } = useTenantRedirect()

  const login = async () => {
    const login = useLogin(mockAuthService)
    await login.mutateAsync({
      email: 'demo@example.com',
      password: 'password123',
    })

    // After login, check if tenant is selected
    // If not, redirect to select-tenant, otherwise to dashboard
    const hasTenant = await checkTenantAndRedirect(RoutePaths.DASHBOARD)
    if (hasTenant) {
      await router.push(RoutePaths.DASHBOARD)
    }
  }

  return { login }
}
