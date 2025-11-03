import { AuthRouteNames } from '@registry/modules/auth/config/routes'
import { authService } from '@registry/modules/auth/services/authService'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
// modules/auth/guards/authGuard.ts
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'

/**
 * Auth guard that handles:
 * - Protected routes (requiresAuth meta)
 * - Guest-only routes (requiresGuest meta)
 * - Auto-refresh user data when JWT exists but user data is missing
 * - Auto-logout on 401 errors
 */
export async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiresGuest = to.matched.some(r => r.meta.requiresGuest)
  const authStore = useAuthStore()

  const hasToken = !!authStore.token
  const hasUser = !!authStore.user
  let isAuthenticated = hasToken && hasUser

  // Try to refetch user data if we have token but no user data
  if (hasToken && !hasUser) {
    try {
      const user = await authService.getCurrentUser()
      authStore.setUser(user)
      isAuthenticated = true // User is now authenticated after successful fetch
    }
    catch (error) {
      // If fetch fails (e.g., 401 Unauthorized), logout
      console.warn('[authGuard] Failed to fetch user data, logging out', error)
      authStore.logout()
      isAuthenticated = false
    }
  }

  // Check auth requirements and redirect if needed
  if (requiresAuth && !isAuthenticated) {
    next({ name: AuthRouteNames.login, query: { redirectTo: to.fullPath } }); return
  }

  if (requiresGuest && isAuthenticated) {
    next({ name: AuthRouteNames.dashboard }); return
  }

  // Allow navigation
  next()
}

/**
 * Helper to install auth guard on router
 * Usage: protectRoutes(router)
 */
export function protectRoutes(router: Router): void {
  router.beforeEach(authGuard)
}
