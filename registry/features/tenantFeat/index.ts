// features/tenantFeat/index.ts
// Public exports for tenantFeat feature

export { default as TenantCard } from './components/TenantCard.vue'
// Components
export { default as TenantGrid } from './components/TenantGrid.vue'
// Composables
export { useTenant } from './composables/useTenant'

export { useTenantList } from './composables/useTenantList'

export { useTenantSwitch } from './composables/useTenantSwitch'
// Routes
export { TenantRouteNames, TenantRoutePaths, tenantRoutes } from './config/routes'

// Config
export { defaultTenantConfig, getTenantConfig } from './config/tenant.config'
export type { TenantConfig } from './config/tenant.config'

// Guards
export { protectTenantRoutes, tenantGuard } from './guards/tenantGuard'

// Utils
export {
  decodeJWT,
  getTenantIdFromToken,
  getTenantRoleFromToken,
  hasTenantContext,
} from './lib/jwtDecoder'

// Pages
export { default as SelectTenantPage } from './pages/SelectTenantPage.vue'
export { mockTenantService } from './services/mockTenantService'
export { tenantMembershipService } from './services/tenantMembershipService'

// Services
export { tenantService } from './services/tenantService'

// Services
export { tenantService } from './services/tenantService'

// Store
export { useTenantStore } from './store/useTenantStore'

// Types
export type {
  CreateTenantDto,
  JWTPayload,
  SwitchTenantResponse,
  Tenant,
  TenantMembership,
  TenantUser,
  UpdateTenantDto,
} from './types/tenant.types'
export { TenantRole } from './types/tenant.types'

export type { ITenantService } from './types/tenantService.type'
