import { JWT_STORE_KEY } from '@registry/shared/config/config'
// Mock tenant service for demo purposes (no real backend needed)
import { HttpStatusCode } from 'axios'
import type {
  CreateTenantDto,
  SwitchTenantResponse,
  Tenant,
  UpdateTenantDto,
} from '../types/tenant.types'
import type { ITenantService } from '../types/tenantService.type'
import { decodeJWT } from '../lib/jwtDecoder'
import { TenantRole } from '../types/tenant.types'

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

// Helper to get current user email from token
function getCurrentUserEmail(): string | null {
  const token = localStorage.getItem(JWT_STORE_KEY)
  if (!token) return null

  try {
    // Decode JWT token (supports both real JWT and legacy mock tokens)
    const payload = decodeJWT(token)
    return payload.email
  } catch {
    // Fallback for legacy mock tokens
    const match = /^mock_jwt_(.+?)_\d+$/.exec(token)
    return match ? match[1] ?? null : null
  }
}

/**
 * Base64URL encoding (JWT-safe base64 encoding)
 */
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

/**
 * Generate a proper JWT token with tenant context
 * Creates unsigned JWT (no signature) or with random signature for mock purposes
 */
function generateTenantToken(email: string, tenantId: string, tenantRole: TenantRole): string {
  const now = Math.floor(Date.now() / 1000)
  const userId = `usr_${email.split('@')[0]}`

  // JWT Header (unsigned JWT)
  const header = {
    alg: 'none',
    typ: 'JWT',
  }

  // JWT Payload
  const payload = {
    sub: userId,
    email: email,
    tid: tenantId,
    trol: tenantRole,
    iat: now,
    exp: now + 3600, // 1 hour expiration
  }

  // Encode header and payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))

  // For unsigned JWT, third part is empty (ends with dot)
  // For mock with random signature, generate random base64 string
  const randomSignature = base64UrlEncode(
    Math.random().toString(36) + Date.now().toString(36)
  )

  // Return JWT with random signature (can be changed to empty string for unsigned)
  return `${encodedHeader}.${encodedPayload}.${randomSignature}`
}

function createHttpError(status: HttpStatusCode, message: string, errors?: Record<string, string[]>): Error {
  const error = new Error(message)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(error as any).response = {
    status,
    data: {
      message,
      errors,
    },
  }
  return error
}

// Simulate network delay
function delay(ms = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class MockTenantService implements ITenantService {
  /**
   * Get list of user's tenants
   */
  async getTenants(): Promise<Tenant[]> {
    await delay()

    const email = getCurrentUserEmail()
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

    const email = getCurrentUserEmail()
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

    const email = getCurrentUserEmail()
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

    const email = getCurrentUserEmail()
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

    const email = getCurrentUserEmail()
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
    const newToken = generateTenantToken(email, tenantId, userTenant.role)

    return {
      token: newToken,
      tenant: userTenant.tenant,
    }
  }
}

export const mockTenantService = new MockTenantService()
