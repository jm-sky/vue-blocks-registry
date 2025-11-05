// features/tenantFeat/lib/jwtDecoder.ts
import { jwtDecode } from 'jwt-decode'
import type { MockJWTPayload } from '../types/mock.type'

/**
 * Decode JWT token and return payload
 * Supports both real JWT tokens and mock tokens (for demo)
 */
export function decodeJWT(token: string): MockJWTPayload {
  // Handle real JWT tokens
  try {
    return jwtDecode<MockJWTPayload>(token)
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
