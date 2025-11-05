import { JWT_STORE_KEY } from '@registry/shared/config/config'
import type { MockJWTPayload, MockJWTPayloadOptions } from '../types/mock.type'
import { decodeJWT } from './jwtDecoder'
import type { HttpStatusCode } from 'axios'

export const getCurrentUserEmailFromMockJWT = (): string => {
  const token = localStorage.getItem(JWT_STORE_KEY)

  try {
    // Decode JWT token (supports both real JWT and legacy mock tokens)
    const payload = decodeJWT(token ?? '')
    return payload.email
  } catch {
    throw new Error('Invalid JWT token')
  }
}

/**
 * Base64URL encoding (JWT-safe base64 encoding)
 */
export function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const generateMockJWT = (options: MockJWTPayloadOptions): string => {
  const now = Math.floor(Date.now() / 1000)
  const userId = `usr_${options.email.split('@')[0]}`

  // JWT Header (unsigned JWT)
  const header = {
    alg: 'none',
    typ: 'JWT',
  }

  // JWT Payload
  const payload: MockJWTPayload = {
    ...options,
    sub: userId,
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

export const createHttpError = (status: HttpStatusCode, message: string, errors?: Record<string, string[]>): Error => {
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

export const delay = (ms = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
