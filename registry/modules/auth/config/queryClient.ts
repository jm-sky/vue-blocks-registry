import { type AuthConfig, getAuthConfig } from '@registry/modules/auth/config/auth.config'
import { createAuthMutationRetryFunction, createAuthRetryFunction } from '@registry/modules/auth/utils/queryUtils'
// modules/auth/config/queryClient.ts
import { QueryClient } from '@tanstack/vue-query'

export interface AuthQueryConfig {
  staleTime?: number
  cacheTime?: number
  retryAttempts?: number
  retryDelay?: number
}

/**
 * Create a QueryClient with auth-optimized defaults
 */
export function createAuthQueryClient(config: Partial<AuthConfig> = {}) {
  const authConfig = getAuthConfig(config)

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: authConfig.query.staleTime,
        gcTime: authConfig.query.cacheTime,
        retry: createAuthRetryFunction(authConfig.query.retryAttempts),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        retry: createAuthMutationRetryFunction(authConfig.query.retryAttempts),
      },
    },
  })
}

/**
 * Default query client for auth operations
 */
export const authQueryClient = createAuthQueryClient()