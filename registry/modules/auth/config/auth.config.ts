// modules/auth/config/auth.config.ts
export interface AuthConfig {
  query: {
    staleTime: number
    cacheTime: number
    retryAttempts: number
    retryDelay: number
  }
  api: {
    baseUrl: string
    timeout: number
  }
}

export const defaultAuthConfig: AuthConfig = {
  query: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retryAttempts: 2,
    retryDelay: 1000, // 1 second
  },
  api: {
    baseUrl: '/api/auth',
    timeout: 10000, // 10 seconds
  },
}

/**
 * Get auth configuration with optional overrides
 */
export function getAuthConfig(overrides: Partial<AuthConfig> = {}): AuthConfig {
  return {
    query: { ...defaultAuthConfig.query, ...overrides.query },
    api: { ...defaultAuthConfig.api, ...overrides.api },
  }
}