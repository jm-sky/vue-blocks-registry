// modules/auth/lib/jwtDecoder.ts
import { jwtDecode } from 'jwt-decode'
import type { TwoFactorJWTPayload } from '@registry/modules/auth/types/twoFactor.type'

interface JWTPayload extends TwoFactorJWTPayload {
  sub?: string
  email?: string
  iat?: number
  exp?: number
}

/**
 * Decode JWT token and return payload
 * Supports both real JWT tokens and mock tokens (for demo)
 */
export function decodeJWT(token: string): JWTPayload {
  // Handle real JWT tokens
  try {
    return jwtDecode<JWTPayload>(token)
  } catch (error) {
    console.error('Error decoding JWT token:', error)
    throw new Error('Invalid JWT token')
  }
}

/**
 * Extract 2FA status from JWT token
 */
export function getTwoFactorStatusFromToken(token: string): TwoFactorJWTPayload {
  try {
    const payload = decodeJWT(token)
    return {
      tfaPending: payload.tfaPending,
      tfaVerified: payload.tfaVerified,
      tfaMethod: payload.tfaMethod,
    }
  } catch {
    return {}
  }
}

/**
 * Check if 2FA verification is pending
 */
export function isTwoFactorPending(token: string): boolean {
  try {
    const payload = decodeJWT(token)
    return payload.tfaPending === true
  } catch {
    return false
  }
}

/**
 * Check if 2FA has been verified
 */
export function isTwoFactorVerified(token: string): boolean {
  try {
    const payload = decodeJWT(token)
    return payload.tfaVerified === true
  } catch {
    return false
  }
}

/**
 * Get 2FA method from token
 */
export function getTwoFactorMethod(token: string): 'totp' | 'webauthn' | null {
  try {
    const payload = decodeJWT(token)
    return payload.tfaMethod ?? null
  } catch {
    return null
  }
}

/**
 * Check if JWT token requires 2FA verification
 */
export function requiresTwoFactorVerification(token: string): boolean {
  return isTwoFactorPending(token) && !isTwoFactorVerified(token)
}
