import { createRouter, createWebHistory } from 'vue-router'
import { protectTenantRoutes } from '@registry/features/tenantFeat/guards/tenantGuard'
import { protectRoutes } from '@registry/modules/auth/guards/authGuard'
import { protectRoutesWithTwoFactor } from '@registry/modules/auth/guards/twoFactorGuard'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Apply guards in order (auth -> 2FA -> tenant)
protectRoutes(router)
protectRoutesWithTwoFactor(router)
protectTenantRoutes(router)

export default router
