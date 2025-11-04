// features/tenantFeat/lib/jwtDecoder.ts
import { jwtDecode } from 'jwt-decode'
import type { JWTPayload } from '../types/tenant.types'

/**
 * Check if token is a mock token (for demo purposes)
 */
function isMockToken(token: string): boolean {
  return token.startsWith('mock_jwt_')
}

/**
 * Parse mock token format: mock_jwt_{email}_{tenantId?}_{tenantRole?}_{timestamp}
 */
function parseMockToken(token: string): JWTPayload {
  const parts = token.replace('mock_jwt_', '').split('_')
  const email = parts[0]

  if (!email) {
    throw new Error('Invalid mock token format')
  }

  let tenantId: string | undefined
  let tenantRole: string | undefined

  // Check if token has tenant context (format: email_tenantId_tenantRole_timestamp)
  // Minimum format without tenant: email_timestamp (2 parts)
  // With tenant: email_tenantId_tenantRole_timestamp (4+ parts)
  if (parts.length >= 4) {
    tenantId = parts[1]
    tenantRole = parts[2]
  }

  return {
    sub: `usr_${email.split('@')[0]}`,
    email: email,
    tid: tenantId,
    trol: tenantRole,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
  }
}

/**
 * Decode JWT token and return payload
 * Supports both real JWT tokens and mock tokens (for demo)
 */
export function decodeJWT(token: string): JWTPayload {
  // Handle mock tokens (for demo purposes)
  if (isMockToken(token)) {
    return parseMockToken(token)
  }

  // Handle real JWT tokens
  try {
    return jwtDecode<JWTPayload>(token)
  } catch (error) {
    console.error('Error decoding JWT token:', error)
    throw new Error('Invalid JWT token')
  }
}

/**
 * Extract tenant ID from JWT token
 */
export function getTenantIdFromToken(token: string): string | null {
  try {
    const payload = decodeJWT(token)
    return payload.tid ?? null
  } catch {
    return null
  }
}

/**
 * Extract tenant role from JWT token
 */
export function getTenantRoleFromToken(token: string): string | null {
  try {
    const payload = decodeJWT(token)
    return payload.trol ?? null
  } catch {
    return null
  }
}

/**
 * Check if JWT token contains tenant context
 */
export function hasTenantContext(token: string): boolean {
  return getTenantIdFromToken(token) !== null
}
