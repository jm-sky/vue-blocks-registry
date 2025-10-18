// modules/auth/config/queryClient.ts
import { QueryClient } from '@tanstack/vue-query'
import { createAuthRetryFunction, createAuthMutationRetryFunction } from '../utils/queryUtils'
import { getAuthConfig, type AuthConfig } from './auth.config'

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
        cacheTime: authConfig.query.cacheTime,
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