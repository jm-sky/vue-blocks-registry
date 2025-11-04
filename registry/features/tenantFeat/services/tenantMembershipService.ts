// features/tenantFeat/services/tenantMembershipService.ts
import { apiClient } from '@registry/shared/services/apiClient'
import type { TenantMembership, TenantUser } from '../types/tenant.types'

class TenantMembershipService {
  /**
   * Get tenant membership details
   */
  async getMembership(tenantId: string): Promise<TenantMembership> {
    const response = await apiClient.get<TenantMembership>(`/tenants/${tenantId}/membership`)
    return response.data
  }

  /**
   * Get list of tenant users
   */
  async getTenantUsers(tenantId: string): Promise<TenantUser[]> {
    const response = await apiClient.get<TenantUser[]>(`/tenants/${tenantId}/users`)
    return response.data
  }
}

export const tenantMembershipService = new TenantMembershipService()
