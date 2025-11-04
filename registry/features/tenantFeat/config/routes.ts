// features/tenantFeat/config/routes.ts
// Configurable route paths for tenant module
// This allows the tenant module to be used in different apps with different route structures

import type { RouteRecordRaw } from 'vue-router'

export const TenantRoutePaths = {
  selectTenant: import.meta.env.VITE_TENANT_SELECT_PATH ?? '/select-tenant',
  dashboard: import.meta.env.VITE_TENANT_DASHBOARD_PATH ?? '/dashboard',
} as const

// Named route versions (when using Vue Router named routes)
export const TenantRouteNames = {
  selectTenant: 'SelectTenant',
  dashboard: 'Dashboard',
} as const

export const tenantRoutes: RouteRecordRaw[] = [
  {
    path: TenantRoutePaths.selectTenant,
    name: TenantRouteNames.selectTenant,
    component: () => import('../pages/SelectTenantPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
