// Mock tenant service for demo purposes (no real backend needed)
import { createHttpError,delay, generateMockJWT, getCurrentUserEmailFromMockJWT } from '@registry/shared/utils/mockHelpers'
import { HttpStatusCode } from 'axios'
import type {
  CreateTenantDto,
  SwitchTenantResponse,
  Tenant,
  UpdateTenantDto,
} from '../types/tenant.types'
import type { ITenantService } from '../types/tenantService.type'
import { TenantRole } from '../types/tenant.types'
import type { JWTPayloadOptions } from '@registry/shared/types/jwt.type'

// Mock tenants database (in-memory)
// Each user (by email) has access to specific tenants with specific roles
const mockUserTenants = new Map<string, { tenant: Tenant; role: TenantRole }[]>([
  [
    'demo@example.com',
    [
      {
        tenant: {
          id: 'tn_001',
          name: 'Acme Corporation',
          slug: 'acme',
          businessIdentifier: 'PL1234567890',
          logo: 'https://ui-avatars.com/api/?name=Acme&background=6366f1&color=fff&size=128',
          description: 'Main company workspace',
          isActive: true,
          createdAt: new Date('2024-01-15').toISOString(),
          updatedAt: new Date('2024-01-15').toISOString(),
        },
        role: TenantRole.OWNER,
      },
      {
        tenant: {
          id: 'tn_002',
          name: 'Tech Startup Inc',
          slug: 'techstartup',
          logo: 'https://ui-avatars.com/api/?name=Tech+Startup&background=10b981&color=fff&size=128',
          description: 'Innovation hub for tech projects',
          isActive: true,
          createdAt: new Date('2024-02-20').toISOString(),
          updatedAt: new Date('2024-02-20').toISOString(),
        },
        role: TenantRole.ADMIN,
      },
      {
        tenant: {
          id: 'tn_003',
          name: 'Consulting Group',
          slug: 'consulting',
          logo: 'https://ui-avatars.com/api/?name=Consulting&background=f59e0b&color=fff&size=128',
          description: 'Client projects and consulting work',
          isActive: true,
          createdAt: new Date('2024-03-10').toISOString(),
          updatedAt: new Date('2024-03-10').toISOString(),
        },
        role: TenantRole.MEMBER,
      },
    ],
  ],
  [
    'test@test.com',
    [
      {
        tenant: {
          id: 'tn_004',
          name: 'Test Organization',
          slug: 'test-org',
          logo: 'https://ui-avatars.com/api/?name=Test+Org&background=ef4444&color=fff&size=128',
          description: 'Testing workspace',
          isActive: true,
          createdAt: new Date('2024-01-01').toISOString(),
          updatedAt: new Date('2024-01-01').toISOString(),
        },
        role: TenantRole.OWNER,
      },
    ],
  ],
])


/**
 * Generate a proper JWT token with tenant context
 * Creates unsigned JWT (no signature) or with random signature for mock purposes
 */
export const generateMockTenantToken = (email: string, tenantId: string, tenantRole: TenantRole): string => {
 // JWT Payload
  const payload: JWTPayloadOptions = {
    email,
    tid: tenantId,
    trol: tenantRole,
  }

  return generateMockJWT(payload)
}

class MockTenantService implements ITenantService {
  /**
   * Get list of user's tenants
   */
  async getTenants(): Promise<Tenant[]> {
    await delay()

    const email = getCurrentUserEmailFromMockJWT()
    if (!email) {
      throw createHttpError(HttpStatusCode.Unauthorized, 'User not authenticated')
    }

    const userTenants = mockUserTenants.get(email)
    if (!userTenants || userTenants.length === 0) {
      return []
    }

    return userTenants.map(ut => ut.tenant)
  }

  /**
   * Get tenant details by ID
   */
  async getTenant(tenantId: string): Promise<Tenant> {
    await delay()

    const email = getCurrentUserEmailFromMockJWT()
    if (!email) {
      throw createHttpError(HttpStatusCode.Unauthorized, 'User not authenticated')
    }

    const userTenants = mockUserTenants.get(email)
    if (!userTenants) {
      throw createHttpError(HttpStatusCode.NotFound, 'Tenant not found')
    }

    const userTenant = userTenants.find(ut => ut.tenant.id === tenantId)
    if (!userTenant) {
      throw createHttpError(HttpStatusCode.Forbidden, 'You do not have access to this tenant')
    }

    return userTenant.tenant
  }

  /**
   * Create a new tenant
   */
  async createTenant(data: CreateTenantDto): Promise<Tenant> {
    await delay()

    const email = getCurrentUserEmailFromMockJWT()
    if (!email) {
      throw createHttpError(HttpStatusCode.Unauthorized, 'User not authenticated')
    }

    const newTenant: Tenant = {
      id: `tn_${Date.now()}`,
      name: data.name,
      slug: data.slug,
      externalId: data.externalId,
      businessIdentifier: data.businessIdentifier,
      logo: data.logo,
      description: data.description,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to user's tenants as owner
    const userTenants = mockUserTenants.get(email) ?? []
    userTenants.push({ tenant: newTenant, role: 'owner' as TenantRole })
    mockUserTenants.set(email, userTenants)

    return newTenant
  }

  /**
   * Update tenant
   */
  async updateTenant(tenantId: string, data: UpdateTenantDto): Promise<Tenant> {
    await delay()

    const email = getCurrentUserEmailFromMockJWT()
    if (!email) {
      throw createHttpError(HttpStatusCode.Unauthorized, 'User not authenticated')
    }

    const userTenants = mockUserTenants.get(email)
    if (!userTenants) {
      throw createHttpError(HttpStatusCode.NotFound, 'Tenant not found')
    }

    const userTenant = userTenants.find(ut => ut.tenant.id === tenantId)
    if (!userTenant) {
      throw createHttpError(HttpStatusCode.Forbidden, 'You do not have access to this tenant')
    }

    // Only owner/admin can update
    if (userTenant.role !== TenantRole.OWNER && userTenant.role !== TenantRole.ADMIN) {
      throw createHttpError(HttpStatusCode.Forbidden, 'Only owners and admins can update tenant')
    }

    // Update tenant
    userTenant.tenant = {
      ...userTenant.tenant,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return userTenant.tenant
  }

  /**
   * Switch to a different tenant
   * Returns new JWT token with tenantId (tid) and tenantRole (trol) in payload
   */
  async switchTenant(tenantId: string): Promise<SwitchTenantResponse> {
    await delay(300)

    const email = getCurrentUserEmailFromMockJWT()
    if (!email) {
      throw createHttpError(HttpStatusCode.Unauthorized, 'User not authenticated')
    }

    const userTenants = mockUserTenants.get(email)
    if (!userTenants) {
      throw createHttpError(HttpStatusCode.NotFound, 'Tenant not found')
    }

    const userTenant = userTenants.find(ut => ut.tenant.id === tenantId)
    if (!userTenant) {
      throw createHttpError(HttpStatusCode.Forbidden, 'You do not have access to this tenant')
    }

    // Generate new token with tenant context
    const newToken = generateMockTenantToken(email, tenantId, userTenant.role)

    return {
      token: newToken,
      tenant: userTenant.tenant,
    }
  }
}

export const mockTenantService = new MockTenantService()
