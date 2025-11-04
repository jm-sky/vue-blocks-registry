// features/tenantFeat/guards/tenantGuard.ts
import { TenantRouteNames } from '../config/routes'
import { useTenantStore } from '../store/useTenantStore'
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'

/**
 * Tenant guard that handles:
 * - Routes that require tenant context (requiresTenant meta)
 * - Auto-redirect to tenant selection if no tenant context
 */
export function tenantGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  const requiresTenant = to.matched.some(r => r.meta.requiresTenant)

  if (!requiresTenant) {
    next()
    return
  }

  const tenantStore = useTenantStore()
  const hasTenant = !!tenantStore.currentTenantId

  // Check if tenant is required and user doesn't have one
  if (!hasTenant) {
    next({
      name: TenantRouteNames.selectTenant,
      query: { redirectTo: to.fullPath }
    })
    return
  }

  // Allow navigation
  next()
}

/**
 * Helper to install tenant guard on router
 * Usage: protectTenantRoutes(router)
 *
 * Note: This should be called after authGuard to ensure user is authenticated first
 */
export function protectTenantRoutes(router: Router): void {
  router.beforeEach(tenantGuard)
}
