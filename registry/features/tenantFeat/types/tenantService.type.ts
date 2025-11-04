import type {
  CreateTenantDto,
  SwitchTenantResponse,
  Tenant,
  UpdateTenantDto,
} from './tenant.types'

/**
 * Interface for tenant service
 * Allows dependency injection for testing and mocking
 */
export interface ITenantService {
  getTenants(): Promise<Tenant[]>
  getTenant(tenantId: string): Promise<Tenant>
  createTenant(data: CreateTenantDto): Promise<Tenant>
  updateTenant(tenantId: string, data: UpdateTenantDto): Promise<Tenant>
  switchTenant(tenantId: string): Promise<SwitchTenantResponse>
}
