import { useRouter } from 'vue-router'
import { RoutePaths } from '@/router/route-names'
import { hasTenantContext } from '@registry/features/tenantFeat/lib/jwtDecoder'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'

/**
 * Composable for handling tenant redirect logic
 * Checks if user has selected a tenant and redirects to select-tenant if not
 */
export const useTenantRedirect = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  /**
   * Check if user has tenant context and redirect if not
   * @param redirectTo Optional redirect path after tenant selection (default: /dashboard)
   */
  const checkTenantAndRedirect = async (redirectTo: string = RoutePaths.DASHBOARD) => {
    if (!authStore.token) {
      // Not authenticated, let auth guard handle it
      return
    }

    if (!hasTenantContext(authStore.token)) {
      // No tenant selected, redirect to select tenant page
      await router.push({
        path: RoutePaths.SELECT_TENANT,
        query: redirectTo !== RoutePaths.DASHBOARD ? { redirect: redirectTo } : undefined,
      })
      return false // Indicate redirect happened
    }

    return true // Tenant is selected
  }

  return {
    checkTenantAndRedirect,
  }
}
