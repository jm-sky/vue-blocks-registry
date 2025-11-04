import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import type { TenantRole } from '../types/tenant.types'
import type { ITenantService } from '../types/tenantService.type'
// features/tenantFeat/composables/useTenant.ts
import { getTenantConfig } from '../config/tenant.config'
import { getTenantIdFromToken, getTenantRoleFromToken } from '../lib/jwtDecoder'
import { tenantService } from '../services/tenantService'
import { useTenantStore } from '../store/useTenantStore'
import { tenantQueryKeys, tenantRetryFunction } from '../utils/queryUtils'

/**
 * Composable for accessing current tenant information
 * Reads tenantId and tenantRole from JWT token
 * Returns current tenant from store
 * @param service Optional tenant service (for mocking/testing)
 */
export function useTenant(service?: ITenantService) {
  const authStore = useAuthStore()
  const tenantStore = useTenantStore()
  const config = getTenantConfig()

  /**
   * Get tenant ID from JWT token
   */
  const tenantId = computed(() => {
    if (!authStore.token) return null
    return getTenantIdFromToken(authStore.token)
  })

  /**
   * Get tenant role from JWT token (trol claim)
   */
  const tenantRole = computed(() => {
    if (!authStore.token) return null
    const role = getTenantRoleFromToken(authStore.token)
    return role as TenantRole | null
  })

  /**
   * Get current tenant from store
   */
  const currentTenant = computed(() => tenantStore.currentTenant)

  /**
   * Check if user has tenant context
   */
  const hasTenant = computed(() => tenantId.value !== null)

  /**
   * Fetch current tenant details if tenantId is available
   */
  const { data: tenantDetails, isLoading, error } = useQuery({
    queryKey: computed(() => tenantQueryKeys.detail(tenantId.value ?? '')),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => (service ?? tenantService).getTenant(tenantId.value!),
    enabled: computed(() => !!tenantId.value),
    retry: tenantRetryFunction,
    staleTime: config.query.staleTime,
  })

  // Update store when tenant details are fetched
  watch(tenantDetails, (newTenant) => {
    if (newTenant) {
      tenantStore.setTenant(newTenant)
    }
  }, { immediate: true })

  return {
    tenantId,
    tenantRole,
    currentTenant: computed(() => tenantDetails.value ?? currentTenant.value),
    hasTenant,
    isLoading,
    error,
  }
}
