// modules/user/utils/queryUtils.ts
import { HttpStatusCode } from 'axios'

/**
 * Query keys for consistent cache management
 */
export const userQueryKeys = {
  all: ['user'] as const,
  profile: () => [...userQueryKeys.all, 'profile'] as const,
  me: () => [...userQueryKeys.all, 'me'] as const,
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
 * Create retry function for user queries with configurable attempts
 */
export function createUserRetryFunction(maxAttempts = 2) {
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
 * Create retry function for user mutations with configurable attempts
 */
export function createUserMutationRetryFunction(maxAttempts = 2) {
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
 * Default retry function for user queries (2 attempts)
 */
export const userRetryFunction = createUserRetryFunction()

/**
 * Default retry function for user mutations (2 attempts)
 */
export const userMutationRetryFunction = createUserMutationRetryFunction()

