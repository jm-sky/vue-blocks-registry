import { createRouter, createWebHistory } from 'vue-router'
import { protectTenantRoutes } from '@registry/features/tenantFeat/guards/tenantGuard'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Protect routes that require tenant context
protectTenantRoutes(router)

export default router
