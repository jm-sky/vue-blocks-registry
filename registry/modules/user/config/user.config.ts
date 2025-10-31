// modules/user/config/user.config.ts
export interface UserConfig {
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

export const defaultUserConfig: UserConfig = {
  query: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retryAttempts: 2,
    retryDelay: 1000, // 1 second
  },
  api: {
    baseUrl: '/api/users',
    timeout: 10000, // 10 seconds
  },
}

/**
 * Get user configuration with optional overrides
 */
export function getUserConfig(overrides: Partial<UserConfig> = {}): UserConfig {
  return {
    query: { ...defaultUserConfig.query, ...overrides.query },
    api: { ...defaultUserConfig.api, ...overrides.api },
  }
}

