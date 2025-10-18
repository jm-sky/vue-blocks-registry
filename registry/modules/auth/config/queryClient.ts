// modules/auth/config/queryClient.ts
import { QueryClient } from '@tanstack/vue-query'

/**
 * Query client configuration optimized for auth operations
 */
export const authQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Auth queries should be fresh by default
      staleTime: 0,
      // Retry auth queries less aggressively
      retry: (failureCount, error: any) => {
        // Don't retry on authentication errors
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false
        }
        // Retry other errors up to 2 times
        return failureCount < 2
      },
      // Don't refetch on window focus for auth queries
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect for auth queries
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry mutations less aggressively
      retry: (failureCount, error: any) => {
        // Don't retry on client errors (4xx)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false
        }
        // Retry server errors up to 2 times
        return failureCount < 2
      },
    },
  },
})