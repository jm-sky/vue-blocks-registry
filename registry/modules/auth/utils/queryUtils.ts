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
export function isAuthError(error: unknown): boolean {
  const errorObj = error as { response?: { status?: number } }
  if (!errorObj.response) return false
  const status = errorObj.response.status
  return status === HttpStatusCode.Unauthorized || status === HttpStatusCode.Forbidden
}

/**
 * Check if an error is a client error (4xx)
 */
export function isClientError(error: unknown): boolean {
  const errorObj = error as { response?: { status?: number } }
  if (!errorObj.response) return false
  const status = errorObj.response.status
  const badRequest = HttpStatusCode.BadRequest as number
  const internalServerError = HttpStatusCode.InternalServerError as number
  return !!status && status >= badRequest && status < internalServerError
}

/**
 * Create retry function for auth queries with configurable attempts
 */
export function createAuthRetryFunction(maxAttempts = 2) {
  return (failureCount: number, error: unknown) => {
    // Don't retry on authentication errors
    if (isAuthError(error)) {
      return false
    }
    // Retry other errors up to maxAttempts times
    return failureCount < maxAttempts
  }
}

/**
 * Create retry function for auth mutations with configurable attempts
 */
export function createAuthMutationRetryFunction(maxAttempts = 2) {
  return (failureCount: number, error: unknown) => {
    // Don't retry on client errors (4xx)
    if (isClientError(error)) {
      return false
    }
    // Retry server errors up to maxAttempts times
    return failureCount < maxAttempts
  }
}

/**
 * Default retry function for auth queries (2 attempts)
 */
export const authRetryFunction = createAuthRetryFunction()

/**
 * Default retry function for auth mutations (2 attempts)
 */
export const authMutationRetryFunction = createAuthMutationRetryFunction()