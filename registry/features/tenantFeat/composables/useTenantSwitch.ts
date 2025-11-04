import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
// features/tenantFeat/composables/useTenantSwitch.ts
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { ITenantService } from '../types/tenantService.type'
import { tenantService } from '../services/tenantService'
import { useTenantStore } from '../store/useTenantStore'
import { tenantMutationRetryFunction, tenantQueryKeys } from '../utils/queryUtils'

/**
 * Composable for switching between tenants
 * Updates token in authStore and current tenant in tenantStore
 */
export function useTenantSwitch(service?: ITenantService) {
  const tenantStore = useTenantStore()
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  const { mutate, isPending: isSwitching, error } = useMutation({
    mutationFn: async (tenantId: string) => {
      const response = await (service ?? tenantService).switchTenant(tenantId)

      // Update token in authStore (integration with authFeat)
      authStore.setToken(response.token)

      // Update current tenant
      tenantStore.setTenant(response.tenant)
    },
    retry: tenantMutationRetryFunction,
    onSuccess: () => {
      // Invalidate all tenant-related queries to refetch with new tenant context
      void queryClient.invalidateQueries({ queryKey: tenantQueryKeys.all })

      // Optionally redirect to dashboard or home
      // import { useRouter } from 'vue-router'
      // const router = useRouter()
      // router.push('/dashboard')
    },
  })

  return {
    switchTenant: mutate,
    isSwitching,
    error,
  }
}
