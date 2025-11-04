// features/tenantFeat/services/tenantService.ts
import { apiClient } from '@registry/shared/services/apiClient'
import type {
  CreateTenantDto,
  SwitchTenantResponse,
  Tenant,
  UpdateTenantDto,
} from '../types/tenant.types'
import type { ITenantService } from '../types/tenantService.type'

class TenantService implements ITenantService {
  /**
   * Get list of user's tenants
   */
  async getTenants(): Promise<Tenant[]> {
    const response = await apiClient.get<Tenant[]>('/tenants')
    return response.data
  }

  /**
   * Get tenant details by ID
   */
  async getTenant(tenantId: string): Promise<Tenant> {
    const response = await apiClient.get<Tenant>(`/tenants/${tenantId}`)
    return response.data
  }

  /**
   * Create a new tenant
   */
  async createTenant(data: CreateTenantDto): Promise<Tenant> {
    const response = await apiClient.post<Tenant>('/tenants', data)
    return response.data
  }

  /**
   * Update tenant
   */
  async updateTenant(tenantId: string, data: UpdateTenantDto): Promise<Tenant> {
    const response = await apiClient.patch<Tenant>(`/tenants/${tenantId}`, data)
    return response.data
  }

  /**
   * Switch to a different tenant
   * Backend returns new JWT token with tenantId in payload
   */
  async switchTenant(tenantId: string): Promise<SwitchTenantResponse> {
    const response = await apiClient.post<SwitchTenantResponse>(`/tenants/${tenantId}/switch`, {})
    return response.data
  }
}

export const tenantService = new TenantService()
