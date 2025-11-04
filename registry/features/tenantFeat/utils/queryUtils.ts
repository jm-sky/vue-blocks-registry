// features/tenantFeat/utils/queryUtils.ts
import { HttpStatusCode } from 'axios'

/**
 * Query keys for consistent cache management
 */
export const tenantQueryKeys = {
  all: ['tenant'] as const,
  list: () => [...tenantQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...tenantQueryKeys.all, 'detail', id] as const,
  current: () => [...tenantQueryKeys.all, 'current'] as const,
  membership: (tenantId: string) => [...tenantQueryKeys.all, 'membership', tenantId] as const,
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
 * Create retry function for tenant queries with configurable attempts
 */
export function createTenantRetryFunction(maxAttempts = 2) {
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
 * Create retry function for tenant mutations with configurable attempts
 */
export function createTenantMutationRetryFunction(maxAttempts = 2) {
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
 * Default retry function for tenant queries (2 attempts)
 */
export const tenantRetryFunction = createTenantRetryFunction()

/**
 * Default retry function for tenant mutations (2 attempts)
 */
export const tenantMutationRetryFunction = createTenantMutationRetryFunction()
