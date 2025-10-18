// modules/auth/utils/queryUtils.ts
import { HttpStatusCode } from 'axios'

/**
 * Query keys for consistent cache management
 */
export const authQueryKeys = {
  all: ['auth'] as const,
  user: () => [...authQueryKeys.all, 'user'] as const,
  me: () => [...authQueryKeys.all, 'me'] as const,
} as const

/**
 * Check if an error is an authentication error (401 or 403)
 */
export function isAuthError(error: any): boolean {
  const status = error?.response?.status
  return status === HttpStatusCode.Unauthorized || status === HttpStatusCode.Forbidden
}

/**
 * Check if an error is a client error (4xx)
 */
export function isClientError(error: any): boolean {
  const status = error?.response?.status
  return status >= HttpStatusCode.BadRequest && status < HttpStatusCode.InternalServerError
}

/**
 * Default retry function for auth queries
 */
export function createAuthRetryFunction() {
  return (failureCount: number, error: any) => {
    // Don't retry on authentication errors
    if (isAuthError(error)) {
      return false
    }
    // Retry other errors up to 2 times
    return failureCount < 2
  }
}

/**
 * Default retry function for auth mutations
 */
export function createAuthMutationRetryFunction() {
  return (failureCount: number, error: any) => {
    // Don't retry on client errors (4xx)
    if (isClientError(error)) {
      return false
    }
    // Retry server errors up to 2 times
    return failureCount < 2
  }
}