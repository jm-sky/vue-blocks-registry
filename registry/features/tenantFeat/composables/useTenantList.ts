// features/tenantFeat/composables/useTenantList.ts
import { useQuery } from '@tanstack/vue-query'
import type { ITenantService } from '../types/tenantService.type'
import { getTenantConfig } from '../config/tenant.config'
import { tenantService } from '../services/tenantService'
import { useTenantStore } from '../store/useTenantStore'
import { tenantQueryKeys, tenantRetryFunction } from '../utils/queryUtils'

/**
 * Composable for fetching list of user's tenants
 * @param service Optional tenant service (for mocking/testing)
 */
export function useTenantList(service?: ITenantService) {
  const tenantStore = useTenantStore()
  const config = getTenantConfig()

  const { data: tenants, isLoading, error, refetch } = useQuery({
    queryKey: tenantQueryKeys.list(),
    queryFn: async () => {
      const tenants = await (service ?? tenantService).getTenants()
      tenantStore.availableTenants = tenants
      return tenants
    },
    retry: tenantRetryFunction,
    staleTime: config.query.staleTime,
  })

  return {
    tenants,
    isLoading,
    error,
    refetch,
  }
}
