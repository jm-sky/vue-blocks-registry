// features/tenantFeat/config/tenant.config.ts
export interface TenantConfig {
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

export const defaultTenantConfig: TenantConfig = {
  query: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retryAttempts: 2,
    retryDelay: 1000, // 1 second
  },
  api: {
    baseUrl: '/api/tenants',
    timeout: 10000, // 10 seconds
  },
}

/**
 * Get tenant configuration with optional overrides
 */
export function getTenantConfig(overrides: Partial<TenantConfig> = {}): TenantConfig {
  return {
    query: { ...defaultTenantConfig.query, ...overrides.query },
    api: { ...defaultTenantConfig.api, ...overrides.api },
  }
}
